"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas/register-schema";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user-service";
import { generateVefificationToken } from "@/data/token";
import { sendEmailVefication } from "@/lib/resent";
export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { Error: "Invalid Credentials" };
  }

  const { name, password, email } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return {
      Error: "Email already in use",
    };

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVefificationToken(user.email!);
  await sendEmailVefication(verificationToken.email, verificationToken.token);

  return { Success: "Email Sent Successfully" };
};
