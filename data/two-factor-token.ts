import db from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.twoFactorToken.findFirst({
      where: {
        email: email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
