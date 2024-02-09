"use server"

import { getTokenByToken } from "@/data/emai-verification";
import db from "@/lib/db";

export const newVerification = async (token: string) => {
  const verificationToken = await getTokenByToken(token);

  if (!verificationToken) {
    return { Error: "Token not found" };
  }

  const hasExpired = new Date(verificationToken.token) < new Date();
  if (hasExpired)
    return {
      Error: "Your token has expired",
    };

  const existingUser = await db.user.findUnique({
    where: {
      id: verificationToken.id,
    },
  });
  if (!existingUser)
    return {
      Error: "User not found",
    };

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: verificationToken.token,
    },
  });

  return {
    Success: "Your email verified successfully",
  };
};
