import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  card_no: z.string(),
  is_email_verified: z.boolean(),
  is_verified: z.boolean(),
  is_face_recognized: z.boolean(),
  profile_picture: z.string().nullable(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const UserTokenResponseSchema = z.object({
  token: z.string(),
  expires_in: z.number(),
});

export const VerifyOtpResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: UserTokenResponseSchema,
});

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const UserProfileResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: UserSchema,
});

export const ForgotPasswordResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    token: z.string(),
  }),
});

export type User = z.infer<typeof UserSchema>;
export type UserTokenResponse = z.infer<typeof UserTokenResponseSchema>;
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;
export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
export type VerifyOtpResponse = z.infer<typeof VerifyOtpResponseSchema>;
export type ForgotPasswordResponse = z.infer<
  typeof ForgotPasswordResponseSchema
>;
