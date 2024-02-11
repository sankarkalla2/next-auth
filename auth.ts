import NextAuth, { Session } from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "./lib/db";
import { getUserById } from "./data/user-service";
import authConfig from "@/auth.config";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

declare module "next-auth" {
  interface User {
    role: "USER" | "ADMIN";
  }
}

interface SessionFunctionParamsWithUser {
  session: Session;
  user: any;
  newSession: any;
  trigger?: "update" | undefined;
}

interface SessionFunctionParamsWithToken {
  session: Session;
  token: any;
  newSession: any;
  trigger?: "update" | undefined;
}

type SessionFunctionParams =
  | SessionFunctionParamsWithUser
  | SessionFunctionParamsWithToken;

interface TokenAndSession {
  session: Session;
  token?: any;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification

      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id!);

      //prevent user signin without email verification
      if (!existingUser?.emailVerified) return false;

      //todo 2fa verification
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async session({ session, token }: TokenAndSession) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      console.log(existingUser);
      token.role = existingUser?.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
