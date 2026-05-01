import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircleIcon,
  InfoIcon,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoginRequestSchema } from "@/lib/schemas/auth";
import { formatFormErrors } from "@/lib/utils";
import { useLogin } from "@/services/queries/auth";
import { useAuthStore } from "@/stores/auth-store";

const LoginPage = () => {
  const login = useLogin();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const authStore = useAuthStore((state) => state);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onChange: LoginRequestSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      setServerError(null);
      setSuccessMessage(null);
      try {
        const res = await login.mutateAsync(value);
        const token = (res as any)?.data?.token ?? (res as any)?.token ?? null;
        if (token) {
          authStore.setToken(token);
        }
        setSuccessMessage("Login successful!");
        formApi.reset();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Login failed";
        setServerError(message);
        throw err;
      }
    },
  });

  return (
    <Card className="w-full max-w-md rounded-2xl border border-[#ebdce2] bg-[#faf4f7] py-0 ring-0">
      <CardHeader className="space-y-2 px-5 pt-6 pb-3 sm:px-8">
        <CardTitle className="font-black text-[#2b1823] text-[3rem] tracking-[-0.05em]">
          Sign In
        </CardTitle>
        <p className="text-[#73606a]">Access your signature vault</p>
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
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <label
                    htmlFor="password"
                    className="font-black text-[#8f7a83] text-[0.68rem] uppercase tracking-[0.2em]"
                  >
                    Password
                  </label>
                  <Link
                    to="/auth/forgot-password"
                    className="font-bold text-[0.68rem] text-primary uppercase tracking-[0.14em]"
                  >
                    Forgot Password?
                  </Link>
                </div>
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

          {serverError && (
            <Alert variant="destructive" className="mt-2">
              <InfoIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert className="mt-2 border-green-200 bg-green-50">
              <CheckCircleIcon className="text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
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
                {isSubmitting ? "Signing in..." : "Sign in"} <ArrowRight />
              </Button>
            )}
          </form.Subscribe>
        </form>

        <p className="pt-2 text-center text-[#77636d] text-[0.86rem]">
          New to the platform?{" "}
          <Link to="/auth/register" className="font-semibold text-primary">
            Create Account
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

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
