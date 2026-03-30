import argon2 from "argon2";
import crypto from "node:crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import mongoose, { Schema, type HydratedDocument, type InferSchemaType, model } from "mongoose";

interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    googleId: {
      type: String,
      default: undefined,
      trim: true,
      unique: true,
      sparse: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationTokenHash: {
      type: String,
      default: null,
    },
    emailVerificationExpiresAt: {
      type: Date,
      default: null,
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "dark",
      },
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await argon2.hash(this.password, {
    type: argon2.argon2id,
  });
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return argon2.verify(this.password, password);
};

userSchema.methods.generateAccessToken = function () {
  const expiresIn = (process.env.ACCESS_TOKEN_EXPIRY || "15m") as SignOptions["expiresIn"];

  return jwt.sign(
    {
      _id: this._id.toString(),
      email: this.email,
      jti: crypto.randomUUID(),
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn },
  );
};

userSchema.methods.generateRefreshToken = function () {
  const expiresIn = (process.env.REFRESH_TOKEN_EXPIRY || "7d") as SignOptions["expiresIn"];

  return jwt.sign(
    {
      _id: this._id.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn },
  );
};

type UserSchemaType = InferSchemaType<typeof userSchema>;
type IUser = UserSchemaType & { _id: mongoose.Types.ObjectId };
type UserDocument = HydratedDocument<IUser, IUserMethods>;
type UserModelType = mongoose.Model<IUser, object, IUserMethods>;

const User = model<IUser, UserModelType>("User", userSchema);

export type { IUser, IUserMethods, UserDocument };
export default User;
