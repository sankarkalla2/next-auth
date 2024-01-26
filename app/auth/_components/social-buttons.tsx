"use client";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialButtons = () => {
  return (
    <div className="w-full flex justify-between gap-x-4">
      <Button variant="outline" className="w-full" size="lg">
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button variant="outline" className="w-full" size="lg">
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SocialButtons;
