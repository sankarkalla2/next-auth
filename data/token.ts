import db from "@/lib/db";
import { v4 as uuid } from "uuid";
import { getTokenByEmail } from "./emai-verification";
import {
  getResetPasswordTokenByEmail,
  getResetPasswordTokenByToken,
} from "./password-token-reset";

export const generateResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 1000);

  const existingToken = await getResetPasswordTokenByEmail(email);
  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: {
        token: existingToken.token,
      },
    });
  }

  const resetPasswordVerificationToken = await db.resetPasswordToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return resetPasswordVerificationToken;
};
export const generateVefificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 1000);
  const existingToken = await getTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });
  return verificationToken;
};
