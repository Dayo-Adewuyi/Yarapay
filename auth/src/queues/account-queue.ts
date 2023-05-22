import { Queue, QueueEvents, Job, Worker } from "bullmq";
import { User } from "../models/users";
import axios from "axios";
import { natsWrapper } from "../nats-wrapper";
import { WalletCreatedPublisher } from "../events/wallet-created-publisher";



interface Payload {
  userId: string;
  accountId: string;
}

export const accountQueue = new Queue<Payload>("account:generation", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const queueEvents = new QueueEvents("account:generation", {
  connection: {
    host: process.env.REDIS_HOST,
  },
});

const worker = new Worker<Payload>(
  "account:generation",
  async (job) => {
    const { userId, accountId } = job.data;
    try {
      const data = await axios.post(
        "https://api-sandbox.circle.com/v1/wallets",
        {
          idempotencyKey: accountId,
          description: "YaraPay Wallet",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
          },
        }
      );

      const ethAccount = await axios.post(
        "https://api-sandbox.circle.com/v1/wallets/" +
          data.data.data.walletId +
          "/addresses",
        {
          idempotencyKey: accountId,
          currency: "USD",
          chain: "ETH",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
          },
        }
      );

      const polygonAccount = await axios.post(
        "https://api-sandbox.circle.com/v1/wallets/" +
          data.data.data.walletId +
          "/addresses",
        {
          idempotencyKey: accountId,
          currency: "USD",
          chain: "MATIC",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
          },
        }
      );

      const wallet = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            walletId: data.data.data.walletId,
            ethaddress: ethAccount.data.data.address,
            polygonaddress: polygonAccount.data.data.address,
          },
        }
      );

      await wallet?.save();
    } catch (err) {
      console.log(err);
      const errWallet = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { walletId: "00000000" } }
      );
      await errWallet?.save();
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
    },
  }
);

worker.on("completed", async (job: Job<Payload>) => {
  const user = await User.findById(job.data.userId);
  if (!user) {
    throw new Error("User not found");
  }

  await new WalletCreatedPublisher(natsWrapper.client).publish({
    userId: job.data.userId,
    walletId: user.walletId,
    ethaddress: user.ethaddress,
    polygonaddress: user.polygonaddress,
    version: user.version,
  });
});

worker.on("error", (err) => {
  console.log("workerJob error", err);
});

queueEvents.on("completed", async ({ jobId }) => {
  console.log("Job completed", jobId);
});
