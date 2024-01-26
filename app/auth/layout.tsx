import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-[100vh] w-full bg-red-400 flex items-center justify-center ">
      {children}
    </div>
  );
};

export default AuthLayout;
