"use client";

import { loginSchema } from "@/schemas/form-schema";
import CardWrapper from "./card-wrapper";

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
import FormError from "./form-error";
import FormSuceess from "./form-success";
import { login } from "@/actions/login";
import Link from "next/link";

const LoginForm = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        if (data.Success) {
          form.reset();
          setSuccess(data.Success);
        }
        if (data.Error) {
          form.reset();
          setError(data.Error);
        }
        if (data.twoFactor) {
          setTwoFactor(true);
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonHref="/auth/register/"
      backButtonLabel="Don't have and account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {twoFactor && (
            <>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 2FA code"
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
                Confirm
              </Button>
            </>
          )}
          {!twoFactor && (
            <>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        {...field}
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="link"
                className="font-normal h-4 px-0"
                asChild
                size="sm"
              >
                <Link href="/auth/reset">Foregot password?</Link>
              </Button>
              <FormError message={error} />
              <FormSuceess message={success} />
              <Button type="submit" className="w-full" disabled={isPending}>
                Submit
              </Button>
            </>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
