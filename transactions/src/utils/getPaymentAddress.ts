import { Wallet } from "../models/wallet";
import { NotFoundError } from "@yarapay/tools";

export const getAddress = async (chain: string, userId: string) => {
  try {
    if (chain === "ETH") {
      const userWallet = await Wallet.findOne({ userId });
      if (!userWallet) {
        throw new NotFoundError();
      }
      return userWallet.ethaddress;
    } else if (chain === "MATIC") {
      const userWallet = await Wallet.findOne({ userId });
      if (!userWallet) {
        throw new NotFoundError();
      }

      return userWallet.polygonaddress;
    }
  } catch (err) {
    console.log(err);
  }
};
