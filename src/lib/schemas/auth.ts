import { z } from "zod";

export const RegisterRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
  name: z.string(),
});

export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const VerifyOtpRequestSchema = z.object({
  email: z.email(),
  otp: z.string(),
});

export const ResetPasswordRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
  token: z.string(),
  otp_code: z.string(),
});

export const ResendOtpRequestSchema = z.object({
  email: z.email(),
});

export const ForgotPasswordRequestSchema = z.object({
  email: z.email(),
});

export const ForgotPasswordResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    token: z.string(),
  }),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type VerifyOtpRequest = z.infer<typeof VerifyOtpRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type ResendOtpRequest = z.infer<typeof ResendOtpRequestSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export type ForgotPasswordResponse = z.infer<
  typeof ForgotPasswordResponseSchema
>;
