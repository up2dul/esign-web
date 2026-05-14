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

export const SignSpecimenSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  preview_url: z.string(),
  created_at: z.iso.datetime(),
});

export const SignListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    count_total_size: z.number(),
    count_total_page: z.number(),
    count_total: z.number(),
    previous_page: z.number().nullable(),
    next_page: z.number().nullable(),
    rows_data: z.object({
      docs: z.array(SignSpecimenSchema),
    }),
  }),
});

export type Sign = z.infer<typeof SignSchema>;
export type SignSpecimen = z.infer<typeof SignSpecimenSchema>;
export type SignListResponse = z.infer<typeof SignListResponseSchema>;
