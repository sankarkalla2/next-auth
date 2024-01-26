"use server";
import * as z from "zod";
import { loginSchema } from "@/schemas/form-schema";
import db from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { Error: "Invalid Credentials" };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
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
