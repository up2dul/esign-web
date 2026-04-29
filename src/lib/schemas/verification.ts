import { z } from "zod";

export const VerificationSuccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const FaceRecognitionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.unknown(),
});

export type VerificationSuccessResponse = z.infer<
  typeof VerificationSuccessResponseSchema
>;
export type FaceRecognitionResponse = z.infer<
  typeof FaceRecognitionResponseSchema
>;
