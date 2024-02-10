"use client";

import { resetSchema } from "@/schemas/reset-schema";
import CardWrapper from "../_components/card-wrapper";

import { useTransition, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../_components/form-error";
import FormSuceess from "../_components/form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { reset } from "@/actions/reset";

const LoginForm = () => {
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot Password"
      backButtonHref="/auth/login/"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuceess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Send resett email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
