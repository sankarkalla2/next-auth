"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();
  if (mode && mode == "redirect") {
    router.push("/");
  }
  const onClick = () => {
    router.push("/auth/login");
  };
  return <span onClick={onClick}>{children}</span>;
};

export default LoginButton;
