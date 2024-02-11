import { getCurrUser } from "@/lib/get-user";
import { NextResponse } from "next/server";

export const GET = async () => {
  const currentRole = await getCurrUser();

  if (currentRole?.role === "ADMIN")
    return new NextResponse(null, { status: 200 });
  return new NextResponse(null, { status: 403 });
};
