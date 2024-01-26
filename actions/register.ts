"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas/register-schema";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user-service";
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

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { Success: "Email Sent Successfully" };
};
