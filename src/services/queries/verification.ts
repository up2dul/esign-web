import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  VerificationQrUrlResponse,
  VerificationSuccessResponse,
} from "@/lib/schemas/verification";
import {
  VerificationQrUrlResponseSchema,
  VerificationSuccessResponseSchema,
} from "@/lib/schemas/verification";
import { api } from "@/services/api";
import { API_ROUTES, QUERY_KEYS } from "@/services/api-config";

export const useVerificationOcr = () => {
  const verificationOcr = useMutation<
    VerificationSuccessResponse,
    Error,
    FormData
  >({
    mutationFn: async (formData) => {
      const res = await api
        .post(API_ROUTES.VERIFICATION.OCR, { body: formData })
        .json();
      return VerificationSuccessResponseSchema.parse(res);
    },
  });

  return verificationOcr;
};

export const useVerificationFaceRecognition = () => {
  const verificationFaceRecognition = useMutation<
    VerificationSuccessResponse,
    Error,
    FormData
  >({
    mutationFn: async (formData) => {
      const res = await api
        .post(API_ROUTES.VERIFICATION.FACE_RECOGNITION, { body: formData })
        .json();
      return VerificationSuccessResponseSchema.parse(res);
    },
  });

  return verificationFaceRecognition;
};

export const useVerificationQrUrl = () => {
  const verificationQrUrl = useQuery<VerificationQrUrlResponse>({
    queryKey: QUERY_KEYS.VERIFICATION.QR_URL,
    queryFn: async () => {
      const res = await api.get(API_ROUTES.VERIFICATION.QR_URL).json();
      return VerificationQrUrlResponseSchema.parse(res);
    },
  });

  return verificationQrUrl;
};

export const useHealthCheck = () => {
  const healthCheck = useQuery({
    queryKey: QUERY_KEYS.HEALTHCHECK,
    queryFn: () => api.get(API_ROUTES.HEALTHCHECK).json(),
  });

  return healthCheck;
};
