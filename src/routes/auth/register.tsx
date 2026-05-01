import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RegisterRequestSchema } from "@/lib/schemas/auth";
import { formatFormErrors } from "@/lib/utils";
import { useRegister } from "@/services/queries/auth";
import { useAuthStore } from "@/stores/auth-store";

const RegisterPage = () => {
  const register = useRegister();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: "", password: "", confirm_password: "", name: "" },
    validators: {
      onChange: RegisterRequestSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const res = await register.mutateAsync(value);
        const token = (res as any)?.data?.token ?? (res as any)?.token ?? null;
        if (token) {
          useAuthStore.getState().setToken(token);
        }
      } catch (err: any) {
        setServerError(err?.message ?? "Registration failed");
        throw err;
      }
    },
  });

  return (
    <Card className="w-full max-w-md rounded-2xl border border-[#ebdce2] bg-[#faf4f7] py-0 ring-0">
      <CardHeader className="space-y-2 px-5 pt-6 pb-3 sm:px-8">
        <CardTitle className="font-black text-[#2b1823] text-[3rem] tracking-[-0.05em]">
          Create Account
        </CardTitle>
        <p className="text-[#73606a]">Join the signature vault</p>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-6 sm:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="name">
            {(field) => (
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block font-black text-[#8f7a83] text-[0.68rem] uppercase tracking-[0.2em]"
                >
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Full Name"
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-lg border-[#ebd5dd] bg-white pr-10"
                  />
                  <UserIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#bea4ad]" />
                </div>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-destructive text-sm">
                      {formatFormErrors(field.state.meta.errors)}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-black text-[#8f7a83] text-[0.68rem] uppercase tracking-[0.2em]"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="curator@esign.com"
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-lg border-[#ebd5dd] bg-white pr-10"
                  />
                  <MailIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#bea4ad]" />
                </div>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-destructive text-sm">
                      {formatFormErrors(field.state.meta.errors)}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block font-black text-[#8f7a83] text-[0.68rem] uppercase tracking-[0.2em]"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-lg border-[#ebd5dd] bg-white pr-10"
                  />
                  <LockIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#bea4ad]" />
                </div>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-destructive text-sm">
                      {formatFormErrors(field.state.meta.errors)}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field name="confirm_password">
            {(field) => (
              <div>
                <label
                  htmlFor="confirm_password"
                  className="mb-1.5 block font-black text-[#8f7a83] text-[0.68rem] uppercase tracking-[0.2em]"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    type="password"
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-11 rounded-lg border-[#ebd5dd] bg-white pr-10"
                  />
                  <LockIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#bea4ad]" />
                </div>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-destructive text-sm">
                      {formatFormErrors(field.state.meta.errors)}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {serverError && (
            <p className="text-destructive text-sm">{serverError}</p>
          )}

          <form.Subscribe
            selector={(s) => ({
              canSubmit: s.canSubmit,
              isSubmitting: s.isSubmitting,
            })}
          >
            {({ canSubmit, isSubmitting }) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="h-11 w-full rounded-lg text-[0.95rem]"
              >
                {isSubmitting ? "Creating account..." : "Create account"}{" "}
                <ArrowRight />
              </Button>
            )}
          </form.Subscribe>
        </form>

        <p className="pt-2 text-center text-[#77636d] text-[0.86rem]">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-primary">
            Sign In
          </Link>
        </p>

        <div className="pt-5 text-center font-semibold text-[#a8949d] text-[0.64rem] uppercase tracking-[0.18em]">
          <p className="inline-flex items-center gap-2">
            <ShieldCheckIcon className="size-3.5" />
            Secure Cloud
            <span>•</span>
            Legally Binding
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});
