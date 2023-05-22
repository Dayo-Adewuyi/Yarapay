import { Queue, QueueEvents, Worker } from "bullmq";
import { Transactions } from "../models/transactions";
import { createTransfer, initiateTransfer } from "../utils/paystack";
import axios from "axios";

interface Payload {
  walletId: string;
  userId: string;
  transactionId: string;
  beneficiary: string;
  transactionAmount: string;
  name: string;
  bankCode: string;
}

export const walletToAccountQueue = new Queue<Payload>("wallet:account", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const queueEvents = new QueueEvents("wallet:account", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const worker = new Worker<Payload>(
  "wallet:account",
  async (job) => {
    const {
      userId,
      walletId,
      transactionId,
      beneficiary,
      transactionAmount,
      name,
      bankCode,
    } = job.data;
    try {
      const data = await axios.post(
        "https://api-sandbox.circle.com/v1/transfers",
        {
          idempotencyKey: transactionId,
          source: {
            type: "wallet",
            id: walletId,
          },
          destination: {
            type: "wallet",
            id: process.env.CIRCLE_ACCOUNT_ID,
          },
          amount: {
            amount: transactionAmount,
            currency: "USD",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
          },
        }
      );

      const recipient = await createTransfer(name, beneficiary, bankCode);

      const transfer = await initiateTransfer(
        transactionId,
        transactionAmount,
        recipient
      );

      const transaction = Transactions.build({
        userId: userId,
        walletId: walletId,
        transactionId: transactionId,
        transactionType: "outgoing",
        transactionStatus: transfer,
        transactionAmount: transactionAmount,
        beneficiary: beneficiary,
        transactionDate: new Date(),
        transactionCurrency: "USD",
      });

      await transaction.save();
    } catch (error) {
      console.log(error);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
    },
  }
);

queueEvents.on("completed", (jobId) => {
  console.log(`Job completed with id ${jobId}`);
});

queueEvents.on("failed", (jobId, err) => {
  console.log(`Job ${jobId} failed with ${err}`);
});

worker.on("completed", (job) => {
  console.log(`Worker completed ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.log(`Worker ${job!.id} failed with ${err}`);
});
