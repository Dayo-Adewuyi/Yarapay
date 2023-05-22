import { Queue, QueueEvents, Job, Worker } from "bullmq";
import { Transactions } from "../models/transactions";
import axios from "axios";

interface Payload {
  walletId: string;
  userId: string;
  transactionId: string;
  email: string;
  transactionAmount: string;
  phoneNumber: string;
  sessionId: string;
  ipAddress: string;
  encryptedData: string;
  keyId: string;
}

export const cardToWalletQueue = new Queue<Payload>("card:wallet", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const worker = new Worker<Payload>(
  "card:wallet",
  async (job) => {
    const {
      userId,
      walletId,
      transactionId,
      email,
      transactionAmount,
      phoneNumber,
      sessionId,
      ipAddress,
      encryptedData,
      keyId,
    } = job.data;
    try {
      const data = await axios.post(
        "https://api-sandbox.circle.com/v1/payments",
        {
          idempotencyKey: transactionId,
          keyId: keyId,
          metadata: {
            email: email,
            phoneNumber: phoneNumber,
            sessionId: sessionId,
            ipAddress: ipAddress,
          },
          amount: {
            amount: transactionAmount,
            currency: "USD",
          },
          verification: "cvv",
          source: {
            id: transactionId,
            type: "card",
          },
          description: "Payment",
          encryptedData: encryptedData,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
          },
        }
      );

      console.log(data.data);

      const transaction = Transactions.build({
        userId: userId,
        walletId: walletId,
        transactionId: transactionId,
        transactionType: "Incoming",
        transactionStatus: "Pending",
        transactionAmount: transactionAmount,
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

worker.on("completed", async (job) => {
  const transaction = await Transactions.findOne({
    transactionId: job.data.transactionId,
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  transaction.set({
    transactionStatus: "Completed",
  });

  await transaction.save();
});

worker.on("failed", async (job) => {
  const transaction = await Transactions.findOne({
    transactionId: job!.data.transactionId,
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  transaction.set({
    transactionStatus: "Failed",
  });

  await transaction.save();
});
