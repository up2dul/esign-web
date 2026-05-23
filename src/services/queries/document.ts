import { useMutation, useQuery } from "@tanstack/react-query";
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
  DocumentSchema,
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

export const useDocumentPreview = (id: string) => {
  const documentPreview = useQuery<DocumentPreviewResponse>({
    queryKey: QUERY_KEYS.DOCUMENT.PREVIEW(id),
    queryFn: async () => {
      const res = await api.get(API_ROUTES.DOCUMENT.PREVIEW(id)).json();

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
        .post(API_ROUTES.DOCUMENT.UPLOAD, {
          body: formData,
        })
        .json<{
          success: boolean;
          message: string;
          data: unknown;
        }>();

      return DocumentSchema.parse(res.data);
    },
  });

  return documentUpload;
};

export const useDocumentSign = () => {
  const documentSign = useMutation<Document, Error, SignDocsRequest>({
    mutationFn: async (data) => {
      const validated = SignDocsRequestSchema.parse(data);

      const res = await api
        .post(API_ROUTES.DOCUMENT.SIGN, {
          json: validated,
        })
        .json<{
          success: boolean;
          message: string;
          data: unknown;
        }>();

      return DocumentSchema.parse(res.data);
    },
  });

  return documentSign;
};
