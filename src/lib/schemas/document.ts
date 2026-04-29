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
  metadata: z.object({}).nullable(),
  cover_url: z.string().nullable(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const DocumentListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(DocumentSchema),
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
export type DocumentMetadata = z.infer<typeof DocumentMetadataSchema>;
export type DocumentListResponse = z.infer<typeof DocumentListResponseSchema>;
export type DocumentPreviewResponse = z.infer<
  typeof DocumentPreviewResponseSchema
>;
export type DocumentValidityResponse = z.infer<
  typeof DocumentValidityResponseSchema
>;
