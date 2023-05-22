import mongoose from "mongoose";

interface TransactionsAttrs {
  userId: string;
  walletId: string;
  transactionId: string;
  transactionType: string;
  transactionStatus?: string;
  transactionAmount?: string;
  transactionFee?: string;
  transactionHash?: string;
  beneficiary?: string;
  transactionDate: Date;
  transactionCurrency?: string;
}

interface TransactionsModel extends mongoose.Model<TransactionsDoc> {
  build(attrs: TransactionsAttrs): TransactionsDoc;
}

interface TransactionsDoc extends mongoose.Document {
  userId: string;
  walletId: string;
  transactionId: string;
  transactionType: string;
  transactionStatus: string;
  transactionAmount: number;
  transactionFee?: number;
  transactionHash?: string;
  beneficiary: string;
  transactionDate: Date;
  transactionCurrency?: string;
  createdAt: Date;
}

const transactionsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    transactionStatus: {
      type: String,
      required: true,
    },
    transactionAmount: {
      type: String,
      required: true,
    },
    transactionFee: {
      type: String,
      required: false,
    },
    transactionHash: {
      type: String,
      required: false,
    },
    beneficiary: {
      type: String,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    transactionCurrency: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

transactionsSchema.statics.build = (attrs: TransactionsAttrs) => {
  return new Transactions(attrs);
};

const Transactions = mongoose.model<TransactionsDoc, TransactionsModel>(
  "Transactions",
  transactionsSchema
);

export { Transactions };
