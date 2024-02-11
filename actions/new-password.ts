"use server";

import {
  getResetPasswordTokenByEmail,
  getResetPasswordTokenByToken,
} from "@/data/password-token-reset";
import { newPasswordSchema } from "@/schemas/new-password-schema";
import { z } from "zod";
import bycrypt from "bcryptjs";
import db from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string
) => {
  if (!token)
    return {
      error: "Token not found",
    };
  const validateFields = newPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "something went wrong",
    };
  }

  const { newPassword, confirmPassword } = validateFields.data;
  if (newPassword !== confirmPassword)
    return {
      error: "inputs should same",
    };

  const verificationToken = await getResetPasswordTokenByToken(token);
  if (!verificationToken)
    return {
      error: "Token not valid",
    };

  const hashedPassword = await bycrypt.hash(newPassword, 10);

  await db.user.update({
    where: {
      email: verificationToken.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.resetPasswordToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return {
    success: "New passowrd created successfully",
  };
};
