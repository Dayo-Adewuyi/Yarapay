import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@yarapay/tools";
import {
  signUp,
  signUpWithMetamask,
  currentUserHandler,
} from "../handlers/signupHandler";

import { signin, signinWithMetamask } from "../handlers/signinHandler";


const router = express.Router();

router.post(
  "/api/auth/signup",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  signUp
);

router.post(
  "/api/auth/signup/metamask",
  [body("email").isEmail().withMessage("Email must be valid")],
  validateRequest,
  signUpWithMetamask
);

router.get("/api/auth/currentuser", currentUserHandler);

router.post(
  "/api/auth/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  signin
);



export { router as authRouter };
