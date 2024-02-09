"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const SocialButtons = () => {
  const onClick = async (privider: "google" | "github") => {
    try {
      signIn(privider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  };
  return (
    <div className="w-full flex justify-between gap-x-4">
      <Button
        variant="outline"
        className="w-full"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        className="w-full"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SocialButtons;
