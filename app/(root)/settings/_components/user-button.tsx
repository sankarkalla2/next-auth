"use client";

import { AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOutIcon, User, User2 } from "lucide-react";
import { FaUser } from "react-icons/fa";
import Logout from "./logout";

const UserButton = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <Avatar className="">
            <AvatarImage src="" />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="bg-sky-500 text-white rounded-full h-7 w-7 p-1" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center gap-x-2">
            <LogOutIcon className="h-4 w-4" />
            <Logout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
