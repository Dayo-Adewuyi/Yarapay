import mongoose from "mongoose";
import { Password } from "../utils/password";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserAttrs {
  email: string;
  username?: string;
  publickey?: string;
  password?: string;
  metamask?: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  walletId: string;
  ethaddress: string;
  polygonaddress: string;
  username: string;
  metamask: boolean;
  isVerified: boolean;
  usdbalance: number;
  btcbalance: number;
  ethbalance: number;
  maticbalance: number;
  version: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
    },
    ethaddress: {
      type: String,
    },
    polygonaddress: {
      type: String,
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    usdbalance: {
      type: Number,
      default: 0,
    },
    btcbalance: {
      type: Number,
      default: 0,
    },
    ethbalance: {
      type: Number,
      default: 0,
    },

    maticbalance: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    version: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password") as string);
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
