import { auth } from "@/auth";

export const getCurrUser = async () => {
  const session = await auth();

  return session?.user;
};
