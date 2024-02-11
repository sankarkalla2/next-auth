"use client";

import { signout } from "@/actions/logout";

const Logout = () => {
  const handleClick = async () => {
    await signout();
  };
  return (
    <span>
      <button onClick={handleClick}>Logout</button>
    </span>
  );
};

export default Logout;
