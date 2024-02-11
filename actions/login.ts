"use server";
import * as z from "zod";
import { loginSchema } from "@/schemas/form-schema";
import db from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  generateTwoFactorToken,
  generateVefificationToken,
} from "@/data/token";
import { sendEmailVefication, sendTwoFactorCode } from "@/lib/resent";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { Error: "Invalid Credentials" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { Error: "Email not found" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVefificationToken(
      existingUser.email
    );

    await sendEmailVefication(verificationToken.email, verificationToken.token);
    return { Success: "confiramation email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    // const twoFactorToken = await generateTwoFactorToken(existingUser.email);
    // await sendTwoFactorCode(twoFactorToken.email, twoFactorToken.token);
    // return { twoFactor: true };

    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken)
        return {
          Error: "Invalid code",
        };

      if (twoFactorToken.token !== code) {
        return { Error: "invalid code" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { Error: "Code expired" };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorCode(twoFactorToken.email, twoFactorToken.token);
      return {
        twoFactor: true,
      };
    }
  }

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
