import { Queue, QueueEvents, Job, Worker } from "bullmq";
import { Transactions } from "../models/transactions";
import axios from "axios";

interface Payload {
  walletId: string;
  userId: string;
  transactionId: string;
  amount: string;
}

export const accountTowalletQueue = new Queue<Payload>("account:wallet", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const worker = new Worker<Payload>(
  "account:wallet",
  async (job) => {
    const { userId, walletId, transactionId, amount } = job.data;
    try {
      const data = await axios.post(
        "https://api-sandbox.circle.com/v1/transfers",
        {
          idempotencyKey: transactionId,
          source: {
            type: "wallet",
            id: process.env.CIRCLE_ACCOUNT_ID,
          },
          destination: {
            type: "wallet",
            id: walletId,
          },
          amount: {
            amount: amount,
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
        transactionType: "Incoming",
        transactionStatus: "Pending",
        transactionAmount: amount,
        transactionDate: new Date(),
      });

      await transaction.save();

      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Worker completed ${job.id}`);
});
