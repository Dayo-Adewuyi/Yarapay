import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Pin } from "../utils/pin";

interface WalletAttrs {
  userId: string;
  walletId: string;
  ethaddress?: string;
  polygonaddress?: string;
}

interface WalletModel extends mongoose.Model<WalletDoc> {
  build(attrs: WalletAttrs): WalletDoc;
}

interface WalletDoc extends mongoose.Document {
  userId: string;
  walletId: string;
  ethaddress?: string;
  polygonaddress?: string;
  pin?: string;
  createdAt: Date;
}

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: false,
    },
    ethaddress: {
      type: String,
      required: false,
    },
    polygonaddress: {
      type: String,
      required: false,
    },
    version: {
      type: Number,
      default: 0,
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

walletSchema.set("versionKey", "version");
walletSchema.plugin(updateIfCurrentPlugin);

walletSchema.pre("save", async function (done) {

  if (this.isModified("pin")) {
    const hashed = await Pin.toHash(this.get("pin") as string);
    this.set("pin", hashed);
  } 
  done();
});

walletSchema.statics.build = (attrs: WalletAttrs) => {
  return new Wallet(attrs);
};

const Wallet = mongoose.model<WalletDoc, WalletModel>("Wallet", walletSchema);

export { Wallet };
