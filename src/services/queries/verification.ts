import { useMutation, useQuery } from "@tanstack/react-query";
import type { VerificationSuccessResponse } from "@/lib/schemas/verification";
import { VerificationSuccessResponseSchema } from "@/lib/schemas/verification";
import { api } from "@/services/api";
import { API_ROUTES, QUERY_KEYS } from "@/services/api-config";

export const useVerificationOcr = () => {
  const verificationOcr = useMutation<
    VerificationSuccessResponse,
    Error,
    FormData
  >({
    mutationFn: async (formData: FormData) => {
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
    mutationFn: async (formData: FormData) => {
      const res = await api
        .post(API_ROUTES.VERIFICATION.FACE_RECOGNITION, { body: formData })
        .json();
      return VerificationSuccessResponseSchema.parse(res);
    },
  });
  return verificationFaceRecognition;
};

export const useHealthCheck = () => {
  const healthCheck = useQuery({
    queryKey: QUERY_KEYS.HEALTHCHECK,
    queryFn: () => api.get(API_ROUTES.HEALTHCHECK).json(),
  });
  return healthCheck;
};
