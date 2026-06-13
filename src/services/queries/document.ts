import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  Document,
  DocumentListResponse,
  DocumentPreviewResponse,
  DocumentValidityResponse,
  SignDocsRequest,
} from "@/lib/schemas/document";
import {
  DocumentListResponseSchema,
  DocumentPreviewResponseSchema,
  DocumentResponseSchema,
  DocumentValidityResponseSchema,
  SignDocsRequestSchema,
} from "@/lib/schemas/document";
import { api } from "@/services/api";
import { API_ROUTES, QUERY_KEYS } from "@/services/api-config";

export const useDocumentList = () => {
  const documentList = useQuery<DocumentListResponse>({
    queryKey: QUERY_KEYS.DOCUMENT.LIST,
    queryFn: async () => {
      const res = await api.get(API_ROUTES.DOCUMENT.LIST).json();
      return DocumentListResponseSchema.parse(res);
    },
  });
  return documentList;
};

export const useDocumentPreview = (id: string, type?: string) => {
  const documentPreview = useQuery<DocumentPreviewResponse>({
    queryKey: QUERY_KEYS.DOCUMENT.PREVIEW(id, type),
    queryFn: async () => {
      const res = await api.get(API_ROUTES.DOCUMENT.PREVIEW(id, type)).json();
      return DocumentPreviewResponseSchema.parse(res);
    },
    enabled: Boolean(id),
  });
  return documentPreview;
};

export const useDocumentValidity = (id: string) => {
  const documentValidity = useQuery<DocumentValidityResponse>({
    queryKey: QUERY_KEYS.DOCUMENT.VALIDITY(id),
    queryFn: async () => {
      const res = await api.get(API_ROUTES.DOCUMENT.VALIDITY(id)).json();
      return DocumentValidityResponseSchema.parse(res);
    },
    enabled: Boolean(id),
  });
  return documentValidity;
};

export const useDocumentUpload = () => {
  const documentUpload = useMutation<Document, Error, FormData>({
    mutationFn: async (formData) => {
      const res = await api
        .post(API_ROUTES.DOCUMENT.UPLOAD, { body: formData })
        .json();
      const parsed = DocumentResponseSchema.parse(res);
      return parsed.data;
    },
    onSuccess: () => {
      toast.success("Document uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload document");
    },
  });
  return documentUpload;
};

export const useDocumentSign = () => {
  const documentSign = useMutation<Document, Error, SignDocsRequest>({
    mutationFn: async (data) => {
      const validated = SignDocsRequestSchema.parse(data);
      const res = await api
        .post(API_ROUTES.DOCUMENT.SIGN, { json: validated })
        .json();
      const parsed = DocumentResponseSchema.parse(res);
      return parsed.data;
    },
    onSuccess: () => {
      toast.success("Document signed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to sign document");
    },
  });
  return documentSign;
};
