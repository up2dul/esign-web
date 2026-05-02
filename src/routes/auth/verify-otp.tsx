import { useForm } from "@tanstack/react-form";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircleIcon,
  InfoIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { VerifyOtpRequestSchema } from "@/lib/schemas/auth";
import { formatFormErrors } from "@/lib/utils";
import { useResendOtp, useVerifyOtp } from "@/services/queries/auth";
import { useAuthStore } from "@/stores/auth-store";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();
  const authStore = useAuthStore((state) => state);

  const search = Route.useSearch();
  const email = search.email || "";

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm({
    defaultValues: { email, otp: "" },
    validators: {
      onChange: VerifyOtpRequestSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setSuccessMessage(null);
      try {
        const res = await verifyOtp.mutateAsync(value);
        const token = res.data?.token ?? null;
        if (token) {
          authStore.setToken(token);
        }
        setSuccessMessage("Verification successful! Redirecting...");
        navigate({ to: "/app" });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Verification failed";
        setServerError(message);
        throw err;
      }
    },
  });

  const handleResend = async () => {
    if (!email || resendDisabled) return;

    setServerError(null);
    setSuccessMessage(null);
    try {
      await resendOtp.mutateAsync({ email });
      setSuccessMessage("OTP resent successfully!");
      setResendDisabled(true);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to resend OTP";
      setServerError(message);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-2xl border border-[#ebdce2] bg-[#faf4f7] py-0 ring-0">
      <CardHeader className="space-y-2 px-5 pt-6 pb-3 sm:px-8">
        <CardTitle className="font-black text-[#2b1823] text-[3rem] tracking-[-0.05em]">
          Verify OTP
        </CardTitle>
        <p className="text-[#73606a]">Enter the code sent to your email</p>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-6 sm:px-8">
        <div className="mb-4 rounded-lg bg-[#f5eef2] px-4 py-3">
          <p className="text-[#2b1823] text-sm">
            <span className="font-medium">Email:</span> {email}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="otp">
            {(field) => (
              <div>
                <label
                  htmlFor="otp"
                  className="mb-1.5 block font-black text-[#8f7a83] text-[0.68rem] uppercase tracking-[0.2em]"
                >
                  OTP Code
                </label>
                <InputOTP
                  maxLength={6}
                  value={field.state.value as string}
                  onChange={(value) => field.handleChange(value)}
                  onBlur={field.handleBlur}
                  className="gap-2"
                  containerClassName="justify-between"
                >
                  <InputOTPGroup className="border-[#ebd5dd] bg-white">
                    <InputOTPSlot
                      index={0}
                      className="h-11 w-11 border-[#ebd5dd]"
                    />
                    <InputOTPSlot
                      index={1}
                      className="h-11 w-11 border-[#ebd5dd]"
                    />
                    <InputOTPSlot
                      index={2}
                      className="h-11 w-11 border-[#ebd5dd]"
                    />
                    <InputOTPSlot
                      index={3}
                      className="h-11 w-11 border-[#ebd5dd]"
                    />
                    <InputOTPSlot
                      index={4}
                      className="h-11 w-11 border-[#ebd5dd]"
                    />
                    <InputOTPSlot
                      index={5}
                      className="h-11 w-11 border-[#ebd5dd]"
                    />
                  </InputOTPGroup>
                </InputOTP>
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
                {isSubmitting ? "Verifying..." : "Verify OTP"} <ArrowRight />
              </Button>
            )}
          </form.Subscribe>
        </form>

        <div className="pt-2 text-center text-[#77636d] text-[0.86rem]">
          <p>
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendDisabled || resendOtp.isPending}
              className="cursor-pointer font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </p>
        </div>

        <p className="pt-2 text-center text-[#77636d] text-[0.86rem]">
          Wrong email?{" "}
          <Link to="/auth/register" className="font-semibold text-primary">
            Register again
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

export const Route = createFileRoute("/auth/verify-otp")({
  component: VerifyOtpPage,
  beforeLoad: ({ search }) => {
    const email = search.email as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw redirect({
        to: "/auth/register",
        search: undefined,
      });
    }
  },
  validateSearch: (search: Record<string, string>) => {
    const email = search.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error("Invalid email");
    }
    return { email };
  },
});
