import { Request, Response } from "express";

export const signout = async (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({});
};
