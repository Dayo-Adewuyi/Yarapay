import { Request, Response } from "express";
import { BadRequestError } from "@yarapay/tools";
import { User } from "../models/users";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError("Account Not Found");
  }
  
};
