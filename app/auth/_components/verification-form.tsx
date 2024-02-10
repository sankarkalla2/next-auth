"use client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import FormMessage from "./form-message";
import { newVerification } from "@/actions/verify-email";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = searchParams.get("token");
  console.log(token);

  if (!token) redirect("/");

  const onSubmit = useCallback(() => {
    setError("");
    setSuccess("");

    newVerification(token).then((data) => {
      if (data.Success) {
        setSuccess(success);
        console.log(success);
      } else {
        if (data.Error) setError(data.Error);
        console.log(error);
      }
    });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="flex justify-center flex-col w-full px-7">
      <CardHeader className="">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-5xl font-bold">🔐Auth</h1>
          <p className="text-muted-foreground text-sm">
            Confirm you email verification
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center w-full justify-center">
          <BeatLoader />
        </div>
        <FormMessage error={error} success={success} />
      </CardContent>
      <CardFooter>
        <Link href="/auth/login">
          <Button variant="link" className="">
            Back to login
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewVerificationForm;
