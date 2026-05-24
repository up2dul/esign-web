import { z } from "zod";

export const DocumentMetadataSchema = z.object({
  koor_x: z.number(),
  koor_y: z.number(),
  height: z.number(),
  width: z.number(),
  page: z.number(),
});

export const SignDocsRequestSchema = z.object({
  document_id: z.uuid(),
  sign_id: z.uuid(),
  metadata: DocumentMetadataSchema,
});

export const DocumentSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  signed_file_id: z.uuid().nullable(),
  original_file_id: z.uuid(),
  sign_id: z.uuid().nullable(),
  status: z.enum(["DRAFT", "SIGNED"]),
  metadata: z.unknown().nullable(),
  cover_url: z.string().nullable(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  deleted_at: z.iso.datetime().nullable().optional(),
});

export const DocumentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: DocumentSchema,
});

export const DocumentListItemSchema = z.object({
  id: z.uuid(),
  original_file_id: z.uuid(),
  signed_file_id: z.uuid().nullable(),
  user_id: z.uuid(),
  cover_url: z.string().nullable(),
  status: z.enum(["DRAFT", "SIGNED"]),
  created_at: z.iso.datetime(),
});

export const DocumentListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    count_total_size: z.number(),
    count_total_page: z.number(),
    count_total: z.number(),
    previous_page: z.number().nullable(),
    next_page: z.number().nullable(),
    rows_data: z.object({
      docs: z.array(DocumentListItemSchema),
    }),
  }),
});

export const DocumentPreviewResponseSchema = z.object({
  buffer: z.unknown(),
  parameters: z.object({
    mimeType: z.string(),
    fileName: z.string(),
    size: z.number(),
  }),
});

export const DocumentValidityResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.unknown(),
});

export type SignDocsRequest = z.infer<typeof SignDocsRequestSchema>;
export type Document = z.infer<typeof DocumentSchema>;
export type DocumentListItem = z.infer<typeof DocumentListItemSchema>;
export type DocumentMetadata = z.infer<typeof DocumentMetadataSchema>;
export type DocumentListResponse = z.infer<typeof DocumentListResponseSchema>;
export type DocumentResponse = z.infer<typeof DocumentResponseSchema>;
export type DocumentPreviewResponse = z.infer<
  typeof DocumentPreviewResponseSchema
>;
export type DocumentValidityResponse = z.infer<
  typeof DocumentValidityResponseSchema
>;
