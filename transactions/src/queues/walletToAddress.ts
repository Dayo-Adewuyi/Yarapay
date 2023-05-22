import { Queue, QueueEvents, Job, Worker } from "bullmq";
import { Transactions } from "../models/transactions";
import axios from "axios";

interface Payload {
  walletId: string;
  userId: string;
  transactionId: string;
  beneficiary: string;
  transactionAmount: string;
  chain: string;
}

export const walletToAddressQueue = new Queue<Payload>("wallet:address", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const queueEvents = new QueueEvents("wallet:address", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const worker = new Worker<Payload>(
  "wallet:address",
  async (job) => {
    const {
      userId,
      walletId,
      transactionId,
      beneficiary,
      transactionAmount,
      chain,
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
            type: "blockchain",
            address: beneficiary,
            chain: chain,
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
        transactionType: "Outgoing",
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
