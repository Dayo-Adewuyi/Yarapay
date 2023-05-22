import express from "express";
import { requireAuth, validateRequest } from "@yarapay/tools";
import {
  getTransactions,
  getBanksList,
  verifyBankAccount,
} from "../handlers/transactionHandler";
import {
  receiveViaBankAccount,
  receiveViaBlockchain,
  receiveViaCard,
} from "../handlers/receiveHandler";
import {
  walletToAddress,
  walletToAccount,
  walletToWallet,
  getBalance,
} from "../handlers/sendHandler";
import { createPin } from "../handlers/pinHandler";
import { body } from "express-validator";

const router = express.Router();

router.get("/api/transactions/history", requireAuth, getTransactions);

router.post(
  "/api/transactions/pin",
  requireAuth,
  [
    body("pin").not().isEmpty().withMessage("Pin is required"),
    body("confirmPin").custom((value, { req }) => {
      if (value !== req.body.pin) {
        throw new Error("Pin confirmation does not match pin");
      }
      return true;
    }),
  ],

  validateRequest,
  createPin
);

router.post(
  "/api/transactions/receive/blockchain",
  [
    body("chain").not().isEmpty().withMessage("Chain is required"),
    body("amount").not().isEmpty().withMessage("Amount is required"),
  ],
  validateRequest,
  requireAuth,
  receiveViaBlockchain
);

router.post(
  "/api/transactions/receive/card",
  [
    body("keyId").not().isEmpty().withMessage("Key id is required"),
    body("encryptedData")
      .not()
      .isEmpty()
      .withMessage("Encrypted data is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("amount").not().isEmpty().withMessage("Amount is required"),
    body("phoneNumber").not().isEmpty().withMessage("Phone number is required"),
    body("sessionId").not().isEmpty().withMessage("Session id is required"),
    body("ipAddress").not().isEmpty().withMessage("Ip address is required"),
  ],
  validateRequest,
  requireAuth,
  receiveViaCard
);

router.post(
  "/api/transactions/receive/bankaccount",
  [
    body("transactionId")
      .not()
      .isEmpty()
      .withMessage("transaction reference is required"),
    body("amount").not().isEmpty().withMessage("Amount is required"),
  ],
  validateRequest,
  requireAuth,
  receiveViaBankAccount
);

router.post(
  "/api/transactions/send/address",
  requireAuth,
  [
    body("beneficiary").not().isEmpty().withMessage("Beneficiary is required"),
    body("transactionAmount")
      .not()
      .isEmpty()
      .withMessage("Transaction amount is required"),
    body("chain").not().isEmpty().withMessage("Chain is required"),
    body("pin").not().isEmpty().withMessage("Pin is required"),
  ],
  validateRequest,
  walletToAddress
);

router.post(
  "/api/transactions/send/bankaccount",
  requireAuth,
  [
    body("beneficiary").not().isEmpty().withMessage("Beneficiary is required"),
    body("transactionAmount")
      .not()
      .isEmpty()
      .withMessage("Transaction amount is required"),
    body("name").not().isEmpty().withMessage("Name is required"),
    body("bankCode").not().isEmpty().withMessage("Bank code is required"),
    body("pin").not().isEmpty().withMessage("Pin is required"),
  ],
  validateRequest,
  walletToAccount
);

router.post(
  "/api/transactions/send/wallet",
  requireAuth,
  [
    body("beneficiary").not().isEmpty().withMessage("Beneficiary is required"),
    body("transactionAmount")
      .not()
      .isEmpty()
      .withMessage("Transaction amount is required"),
    body("pin").not().isEmpty().withMessage("Pin is required"),
  ],
  validateRequest,
  walletToWallet
);

router.get("/api/transactions/balance", requireAuth, getBalance);

router.get("/api/transactions/banks", requireAuth, getBanksList);

router.post(
  "/api/transactions/verify",
  requireAuth,
  [
    body("accountNumber")
      .not()
      .isEmpty()
      .withMessage("Account number is required"),
    body("bankCode").not().isEmpty().withMessage("Bank code is required"),
  ],
  validateRequest,
  verifyBankAccount
);

export { router as transactionRouter };
