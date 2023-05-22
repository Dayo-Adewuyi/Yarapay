import { Wallet } from "../models/wallet";
import { Pin } from "./pin";

export const verifyPin = async (userId: string, pin: string) => {
  const userWallet = await Wallet.findOne({ userId });
  if (!userWallet) {
    throw new Error("User not found");
  }
  if (!userWallet.pin) {
    throw new Error("Pin not set");
  }

  const pinMatch = await Pin.compare(userWallet.pin!, pin);
  if (!pinMatch) {
    throw new Error("Invalid pin");
  }

  return true;
};
