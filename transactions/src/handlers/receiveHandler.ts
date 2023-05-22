import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "@yarapay/tools";
import { v4 as uuidv4 } from "uuid";
import { Wallet } from "../models/wallet";
import { getAddress } from "../utils/getPaymentAddress";
import { generateQR } from "../utils/generateQrCode";
import { cardToWalletQueue } from "../queues/cardToWallet";
import { accountTowalletQueue } from "../queues/BankAccountToWallet";

export const receiveViaBlockchain = async (req: Request, res: Response) => {
  const { chain, amount } = req.body;

  const address = await getAddress(chain, req.currentUser!.id);

  if (!address) {
    throw new NotFoundError();
  }

  const qrCode = await generateQR(address, amount);

  res.status(200).send({
    address,
    qrCode,
  });
};

export const receiveViaCard = async (req: Request, res: Response) => {
  const {
    keyId,
    encryptedData,
    email,
    amount,
    phoneNumber,
    sessionId,
    ipAddress,
  } = req.body;

  const userWallet = await Wallet.findOne({ userId: req.currentUser!.id });
  if (!userWallet) {
    throw new NotFoundError();
  }

  const transactionId = uuidv4();

  await cardToWalletQueue.add(
    "card:wallet",
    {
      userId: req.currentUser!.id,
      walletId: userWallet.walletId,
      transactionId,
      email,
      transactionAmount: amount,
      phoneNumber,
      sessionId,
      ipAddress,
      encryptedData,
      keyId,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  res.status(200).send({
    message: "Transaction in progress",
    transactionId,
  });
};

export const receiveViaBankAccount = async (req: Request, res: Response) => {
  const { transactionId, amount } = req.body;

  const userWallet = await Wallet.findOne({ userId: req.currentUser!.id });
  if (!userWallet) {
    throw new NotFoundError();
  }

  const sendAmount = JSON.stringify(amount / 750);

  await accountTowalletQueue.add(
    "account:wallet",
    {
      userId: req.currentUser!.id,
      walletId: userWallet.walletId,
      transactionId,
      amount: sendAmount,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  res.status(200).send({
    message: "Transaction in progress",
    transactionId,
  });
};
