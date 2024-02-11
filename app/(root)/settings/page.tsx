// import { auth, signOut } from "@/auth";

"use client";

import { signout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-curret-user";
import { useSession } from "next-auth/react";

const Settings = () => {
  const session = useCurrentUser();

  const handleLogout = async () => {
    await signout();
  };
  return (
    <div>
      <form>
        <button type="submit" onClick={handleLogout}>
          SignOut{" "}
        </button>
      </form>
    </div>
  );
};

export default Settings;
