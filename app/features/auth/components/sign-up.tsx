import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/features/auth/lib/auth-client";

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email is Required" }),
  name: z.string().min(1, { message: "Email is Required" }),
  password: z
    .string()
    .min(8, { message: "minLengthErrorMessage" })
    .max(20, { message: "maxLengthErrorMessage" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "uppercaseErrorMessage",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "lowercaseErrorMessage",
    })
    .refine((password) => /[0-9]/.test(password), { message: "numberErrorMessage" })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "specialCharacterErrorMessage",
    }),
});

export const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, name, password }: z.infer<typeof formSchema>) => {
    if (loading) return;

    await authClient.signUp.email(
      { email, password, name },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.navigate({ to: "/" });
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
