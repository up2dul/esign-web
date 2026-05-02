import { z } from "zod";

export const ApiErrorSchema = z.object({
  code: z.string(),
});

export const ApiErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.record(z.string(), z.string()).optional(),
  error: ApiErrorSchema.optional(),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export const RegisterRequestSchema = z
  .object({
    email: z.email().min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirm_password: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    name: z.string().min(1, "Name is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export const LoginRequestSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export const VerifyOtpRequestSchema = z.object({
  email: z
    .email({
      message: "Invalid email address",
    })
    .min(1, "Email is required"),
  otp: z.string().min(1, "OTP is required"),
});

export const ResetPasswordRequestSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirm_password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  token: z.string().min(1, "Token is required"),
  otp_code: z.string().min(1, "OTP code is required"),
});

export const ResendOtpRequestSchema = z.object({
  email: z
    .email({
      message: "Invalid email address",
    })
    .min(1, "Email is required"),
});

export const ForgotPasswordRequestSchema = z.object({
  email: z.email().min(1, "Email is required"),
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
