import { z } from "zod";

export const SignSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    user_id: z.union([z.string(), z.number()]),
    file_id: z.union([z.string(), z.number()]),
    metadata: z.any(),
    preview_url: z.string().nullable(),
    created_at: z.union([z.string(), z.number()]),
    updated_at: z.union([z.string(), z.number()]),
  })
  .passthrough();

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
