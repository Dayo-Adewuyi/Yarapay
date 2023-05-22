import { Response, Request } from "express";
import { BadRequestError } from "@yarapay/tools";
import { Wallet } from "../models/wallet";

export const createPin = async (req: Request, res: Response) => {
  const { pin } = req.body;

  const existingUser = await Wallet.findOne({ userId: req.currentUser!.id });

  if (!existingUser) {
    throw new BadRequestError("Account Not Found");
  }

  if (existingUser.pin) {
    throw new BadRequestError("Pin already set");
  }

  existingUser.set({
    pin,
  });

  await existingUser.save();

  res.status(201).send({
    message: "Pin created successfully",
    
  });
};
