import { User } from "../models/users";
import { Request, Response } from "express";
import { BadRequestError } from "@yarapay/tools";
import { Password } from "../utils/password";
import jwt from "jsonwebtoken";
import MetaMaskSDK from "@metamask/sdk";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: 3600,
    }
  );

  req.session = {
    jwt: userJwt,
  };

  res.status(200).send({
    user: existingUser,
    token: userJwt,
  });
};

export const signinWithMetamask = async (req: Request, res: Response) => {
  const MMSDK = new MetaMaskSDK();
  const ethereum = MMSDK.getProvider();

  const accounts = await ethereum!.request({ method: "eth_requestAccounts" });
  const account = accounts![0 as keyof typeof accounts];

  const existingUser = await User.findOne({ publickey: account });
  if (!existingUser) {
    throw new BadRequestError("Account does not exist");
  }

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: 3600,
    }
  );

  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existingUser);
};
