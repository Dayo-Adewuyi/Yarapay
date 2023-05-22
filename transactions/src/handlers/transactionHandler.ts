import { Transactions } from "../models/transactions";
import { Request, Response } from "express";
import { NotFoundError } from "@yarapay/tools";
import { verifyAccount, getBanks } from "../utils/paystack";

export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await Transactions.find({ userId: req.currentUser!.id });
  if (!transactions) {
    throw new NotFoundError();
  }

  res.status(200).send(transactions);
};

export const getBanksList = async (req: Request, res: Response) => {
  const banks = await getBanks();
  res.status(200).send(banks);
};

export const verifyBankAccount = async (req: Request, res: Response) => {
  const { accountNumber, bankCode } = req.body;
  const accountDetails = await verifyAccount(accountNumber, bankCode);
  res.status(200).send(accountDetails);
};
