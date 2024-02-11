"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserButton from "./user-button";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[500px]">
      <div className="h-[60px] flex items-center bg-secondary w-[500px] px-2 rounded-md justify-between">
        <div className="flex gap-x-4">
          <Button
            size="sm"
            variant={pathname === "/admin" ? "default" : "outline"}
            asChild
          >
            <Link href="/admin">Admin</Link>
          </Button>
          <Button
            size="sm"
            variant={pathname === "/server" ? "default" : "outline"}
            asChild
          >
            <Link href="/server">Server</Link>
          </Button>
          <Button
            size="sm"
            variant={pathname === "/client" ? "default" : "outline"}
            asChild
          >
            <Link href="/client">Client</Link>
          </Button>
          <Button
            size="sm"
            variant={pathname === "/settings" ? "default" : "outline"}
            asChild
          >
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
        <div className="">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
