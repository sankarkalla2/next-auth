"use server";

import { generateResetPasswordToken } from "@/data/token";
import { getUserByEmail } from "@/data/user-service";
import { sendForgotPassword } from "@/lib/resent";
import { resetSchema } from "@/schemas/reset-schema";
import { z } from "zod";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validateFields = resetSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Email" };
  }

  const { email } = validateFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser)
    return {
      error: "Email not found",
    };

  //Tood:
  //generate token and reset password
  const verificatioToken = await generateResetPasswordToken(email);
  sendForgotPassword(verificatioToken.email, verificatioToken.token);
  return {
    success: "Email Sent successfully",
  };
};
