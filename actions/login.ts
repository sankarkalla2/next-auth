"use server";
import * as z from "zod";
import { loginSchema } from "@/schemas/form-schema";
import db from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVefificationToken } from "@/data/token";
import { sendEmailVefication } from "@/lib/resent";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { Error: "Invalid Credentials" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { Error: "Email not found" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVefificationToken(
        existingUser.email
      );

      await sendEmailVefication(
        verificationToken.email,
        verificationToken.token
      );
    }
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { Error: "Invalid Credentials" };

        default:
          return { Error: "Something went wrong" };
      }
    }
    throw err;
  }
  return { Success: "You are logged successfully" };
};
