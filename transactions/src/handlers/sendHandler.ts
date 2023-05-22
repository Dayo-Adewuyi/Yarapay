import { Wallet } from "../models/wallet";
import { v4 as uuidv4 } from "uuid";
import {
  BadRequestError,
  NotAuthorizedError,
  InternalServerError,
  NotFoundError,
} from "@yarapay/tools";
import { Request, Response } from "express";
import { walletToAddressQueue } from "../queues/walletToAddress";
import { walletToWalletQueue } from "../queues/walletToWallet";
import { walletToAccountQueue } from "../queues/walletToBankAccount";
import axios from "axios";
import { verifyPin } from "../utils/verifyPin";

export const getBalance = async (req: Request, res: Response) => {
  console.log(req.currentUser!.id);
  const userWallet = await Wallet.findOne({ userId: req.currentUser!.id });

  if (!userWallet) {
    throw new BadRequestError("Wallet not found");
  }
  const { data } = await axios.get(
    `https://api-sandbox.circle.com/v1/wallets/${userWallet.walletId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
      },
    }
  );

  if (!data) {
    throw new InternalServerError("data could not be fetched");
  }

  const balance = data.data.balances[0].amount;

  res.status(200).send({
    balance,
  });
};

export const walletToAddress = async (req: Request, res: Response) => {
  const { beneficiary, transactionAmount, chain } = req.body;
  const userWallet = await Wallet.findOne({ userId: req.currentUser!.id });
  if (!userWallet) {
    throw new NotFoundError();
  }

  const verifyPinStatus = await verifyPin(
    req.currentUser!.id,
    req.body.pin as string
  );

  if (!verifyPinStatus) {
    throw new NotAuthorizedError();
  }

  const transactionId = uuidv4();

  await walletToAddressQueue.add(
    "wallet:address",
    {
      userId: req.currentUser!.id,
      walletId: userWallet.walletId,
      transactionId,
      beneficiary,
      transactionAmount,
      chain,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  res.status(201).send({
    message: "Transaction in progress",
    transactionId,
  });
};

export const walletToWallet = async (req: Request, res: Response) => {
  const { beneficiary, transactionAmount } = req.body;
  const userWallet = await Wallet.findOne({ userId: req.currentUser!.id });
  if (!userWallet) {
    throw new NotFoundError();
  }

  const verifyPinStatus = await verifyPin(
    req.currentUser!.id,
    req.body.pin as string
  );

  if (!verifyPinStatus) {
    throw new NotAuthorizedError();
  }

  const transactionId = uuidv4();

  await walletToWalletQueue.add(
    "wallet:wallet",
    {
      userId: req.currentUser!.id,
      walletId: userWallet.walletId,
      transactionId,
      beneficiary,
      transactionAmount,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  res.status(201).send({
    message: "Transaction in progress",
    transactionId,
  });
};

export const walletToAccount = async (req: Request, res: Response) => {
  const { beneficiary, transactionAmount, name, bankCode } = req.body;

  const userWallet = await Wallet.findOne({ userId: req.currentUser!.id });

  if (!userWallet) {
    throw new NotFoundError();
  }

  const verifyPinStatus = await verifyPin(
    req.currentUser!.id,
    req.body.pin as string
  );

  if (!verifyPinStatus) {
    throw new NotAuthorizedError();
  }

  const transactionId = uuidv4();

  await walletToAccountQueue.add(
    "wallet:account",
    {
      userId: req.currentUser!.id,
      walletId: userWallet.walletId,
      transactionId,
      beneficiary,
      transactionAmount,
      name,
      bankCode,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  res.status(201).send({
    message: "Transaction in progress",
    transactionId,
  });
};
