"use client";

import FormError from "@/app/auth/_components/form-error";
import FormSuceess from "@/app/auth/_components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCurrUser } from "@/lib/get-user";

const AdminPage = async () => {
  const user = await getCurrUser();

  const checkApiRoute = async () => {
    console.log("api route");
    fetch("/api/admin")
      .then(() => {
        console.log("Okay");
      })
      .catch(() => {
        console.log("forbidden");
      });
  };
  return (
    <Card>
      <CardHeader className="text-center w-full">
        <h1 className="text-3xl font-bold">🔑Admin</h1>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          {user?.role === "ADMIN" ? (
            <FormSuceess message="You are allowed to see this" />
          ) : (
            <FormError message="You are not allowed" />
          )}
        </div>
      </CardContent>
      <CardContent className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center bg-secondary p-2 rounded-lg">
          <p>Admin Route</p>
          <Button size="sm" onClick={checkApiRoute}>
            Change Route
          </Button>
        </div>
        <div className="flex justify-between items-center bg-secondary p-2 rounded-lg pt-2">
          <p>Admin Action</p>
          <Button size="sm">Change action</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
