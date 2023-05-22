import { Queue, QueueEvents, Job, Worker } from "bullmq";
import { Transactions } from "../models/transactions";
import axios from "axios";

interface Payload {
  walletId: string;
  userId: string;
  transactionId: string;
  beneficiary: string;
  transactionAmount: string;
}

export const walletToWalletQueue = new Queue<Payload>("wallet:wallet", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const queueEvents = new QueueEvents("wallet:wallet", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const worker = new Worker<Payload>(
  "wallet:wallet",
  async (job) => {
    const { userId, walletId, transactionId, beneficiary, transactionAmount } =
      job.data;
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
            id: beneficiary,
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

      const transaction = Transactions.build({
        userId: userId,
        walletId: walletId,
        transactionId: transactionId,
        transactionType: "outgoing",
        transactionStatus: data.data.data.status,
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
