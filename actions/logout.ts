"use server";
import { auth, signOut } from "@/auth";

export const signout = async () => {
  await signOut();
};
