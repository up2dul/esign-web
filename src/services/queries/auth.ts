import { useMutation } from "@tanstack/react-query";
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "@/lib/schemas/auth";
import {
  ApiErrorResponseSchema,
  ForgotPasswordRequestSchema,
  ForgotPasswordResponseSchema,
  LoginRequestSchema,
  RegisterRequestSchema,
  ResendOtpRequestSchema,
  ResetPasswordRequestSchema,
  VerifyOtpRequestSchema,
} from "@/lib/schemas/auth";
import type {
  ForgotPasswordResponse,
  SuccessResponse,
  VerifyOtpResponse,
} from "@/lib/schemas/user";
import {
  SuccessResponseSchema,
  VerifyOtpResponseSchema,
} from "@/lib/schemas/user";
import { api } from "@/services/api";
import { API_ROUTES, QUERY_KEYS } from "@/services/api-config";

export const useRegister = () => {
  const register = useMutation<SuccessResponse, Error, RegisterRequest>({
    mutationFn: async (data) => {
      const validated = RegisterRequestSchema.parse(data);
      try {
        const res = await api
          .post(API_ROUTES.AUTH.REGISTER, { json: validated })
          .json();
        return SuccessResponseSchema.parse(res);
      } catch (err: unknown) {
        const error = err as { data?: unknown };
        const errorData = error?.data ?? null;
        const parsed = ApiErrorResponseSchema.safeParse(errorData);
        const message = parsed.success
          ? parsed.data.message
          : "Registration failed";
        throw new Error(message);
      }
    },
  });
  return register;
};

export const useLogin = () => {
  const login = useMutation<SuccessResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const validated = LoginRequestSchema.parse(data);
      try {
        const res = await api
          .post(API_ROUTES.AUTH.LOGIN, { json: validated })
          .json();
        return SuccessResponseSchema.parse(res);
      } catch (err: unknown) {
        const error = err as { response?: Response; data?: unknown };
        const errorData = error?.data ?? null;
        const parsed = ApiErrorResponseSchema.safeParse(errorData);
        const message = parsed.success ? parsed.data.message : "Login failed";
        throw new Error(message);
      }
    },
  });
  return login;
};

export const useVerifyOtp = () => {
  const verifyOtp = useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationKey: QUERY_KEYS.AUTH.VERIFY_OTP,
    mutationFn: async (data) => {
      const validated = VerifyOtpRequestSchema.parse(data);
      try {
        const res = await api
          .post(API_ROUTES.AUTH.VERIFY_OTP, { json: validated })
          .json();
        return VerifyOtpResponseSchema.parse(res);
      } catch (err: unknown) {
        const error = err as { data?: unknown };
        const errorData = error?.data ?? null;
        const parsed = ApiErrorResponseSchema.safeParse(errorData);
        const message = parsed.success
          ? parsed.data.message
          : "Verification failed";
        throw new Error(message);
      }
    },
  });
  return verifyOtp;
};

export const useResendOtp = () => {
  const resendOtp = useMutation<SuccessResponse, Error, ResendOtpRequest>({
    mutationKey: QUERY_KEYS.AUTH.RESEND_OTP,
    mutationFn: async (data) => {
      const validated = ResendOtpRequestSchema.parse(data);
      try {
        const res = await api
          .post(API_ROUTES.AUTH.RESEND_OTP, { json: validated })
          .json();
        return SuccessResponseSchema.parse(res);
      } catch (err: unknown) {
        const error = err as { data?: unknown };
        const errorData = error?.data ?? null;
        const parsed = ApiErrorResponseSchema.safeParse(errorData);
        const message = parsed.success
          ? parsed.data.message
          : "Failed to resend OTP";
        throw new Error(message);
      }
    },
  });
  return resendOtp;
};

export const useForgotPassword = () => {
  const forgotPassword = useMutation<
    ForgotPasswordResponse,
    Error,
    ForgotPasswordRequest
  >({
    mutationFn: async (data) => {
      const validated = ForgotPasswordRequestSchema.parse(data);
      try {
        const res = await api
          .post(API_ROUTES.AUTH.FORGOT_PASSWORD, { json: validated })
          .json();
        return ForgotPasswordResponseSchema.parse(res);
      } catch (err: unknown) {
        const error = err as { data?: unknown };
        const errorData = error?.data ?? null;
        const parsed = ApiErrorResponseSchema.safeParse(errorData);
        const message = parsed.success
          ? parsed.data.message
          : "Failed to send reset instructions";
        throw new Error(message);
      }
    },
  });
  return forgotPassword;
};

export const useResetPassword = () => {
  const resetPassword = useMutation<
    SuccessResponse,
    Error,
    ResetPasswordRequest
  >({
    mutationFn: async (data) => {
      const validated = ResetPasswordRequestSchema.parse(data);
      try {
        const res = await api
          .post(API_ROUTES.AUTH.RESET_PASSWORD, { json: validated })
          .json();
        return SuccessResponseSchema.parse(res);
      } catch (err: unknown) {
        const error = err as { data?: unknown };
        const errorData = error?.data ?? null;
        const parsed = ApiErrorResponseSchema.safeParse(errorData);
        const message = parsed.success
          ? parsed.data.message
          : "Failed to reset password";
        throw new Error(message);
      }
    },
  });
  return resetPassword;
};
