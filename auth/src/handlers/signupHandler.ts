import { User } from "../models/users";
import { Request, Response } from "express";
import { BadRequestError } from "@yarapay/tools";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { accountQueue } from "../queues/account-queue";
import MetaMaskSDK from "@metamask/sdk";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
    throw new BadRequestError("Username exists");
  }

  if (existingUser) {
    throw new BadRequestError("Email in use");
  }

  const user = User.build({ username, email, password });
  await user.save();

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: 3600,
    }
  );

  req.session = {
    jwt: userJwt,
  };

  const accountId = uuidv4();

  await accountQueue.add(
    "account:generation",
    {
      userId: user.id,
      accountId,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    }
  );
  res.status(201).send(user);
};

export const signUpWithMetamask = async (req: Request, res: Response) => {
  const { email } = req.body;

  const MMSDK = new MetaMaskSDK();

  const ethereum = MMSDK.getProvider();
  const account = await ethereum!.request({
    method: "eth_requestAccounts",
    params: [],
  });

  const publicKey = account![0 as keyof typeof account];

  const existingUser = await User.findOne({ publickey: publicKey });

  if (existingUser) {
    throw new BadRequestError("Account already exists");
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new BadRequestError("Email in use");
  }

  const user = User.build({
    email,
    publickey: publicKey,
    username: publicKey,
    metamask: true,
  });

  await user.save();

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: 3600,
    }
  );

  req.session = {
    jwt: userJwt,
  };

  const accountId = uuidv4();

  await accountQueue.add(
    "account:generation",
    {
      userId: user.id,
      accountId,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  // const msgParams = {
  //   types: {
  //     EIP712Domain: [
  //       { name: "name", type: "string" },
  //       { name: "version", type: "string" },
  //       { name: "chainId", type: "uint256" },
  //       { name: "verifyingContract", type: "address" },
  //     ],
  //     Person: [
  //       { name: "name", type: "string" },
  //       { name: "wallet", type: "address" },
  //     ],
  //     Mail: [
  //       { name: "from", type: "Person" },
  //       { name: "to", type: "Person" },
  //       { name: "contents", type: "string" },
  //     ],
  //   },
  //   primaryType: "Mail",
  //   domain: {
  //     name: "YaraPay",
  //     version: "1",
  //     chainId: "0x1",
  //     verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  //   },
  //   message: {
  //     from: {
  //       name: "YaraPay",
  //       wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
  //     },
  //     to: {
  //       name: email,
  //       wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
  //     },
  //     contents: "Hi, sign this message to complete your registration",
  //   },
  // };

  // const signResponse = await ethereum!.request({
  //   method: "eth_signTypedData_v3",
  //   params: [publicKey, msgParams],
  // });
  res.status(201).send(user);
};

export const currentUserHandler = async (req: Request, res: Response) => {
  console.log(req.currentUser);
  const user = await User.findById(req.currentUser!.id);

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).send(user);
};
