"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button className="hover:text-blue-600 text-center w-full" variant="link">
      <Link href={href} className="text-sm">{label}</Link>
    </Button>
  );
};

export default BackButton;
