import { z } from "zod";

export const SignSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  file_id: z.uuid(),
  metadata: z.object({}),
  preview_url: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const SignListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(SignSchema),
});

export type Sign = z.infer<typeof SignSchema>;
export type SignListResponse = z.infer<typeof SignListResponseSchema>;
