import { useMutation, useQuery } from "@tanstack/react-query";
import type { Sign, SignListResponse } from "@/lib/schemas/sign";
import { SignListResponseSchema, SignSchema } from "@/lib/schemas/sign";
import { api } from "@/services/api";
import { API_ROUTES, QUERY_KEYS } from "@/services/api-config";

export const useSignSpecimenList = () => {
  const signSpecimenList = useQuery<SignListResponse>({
    queryKey: QUERY_KEYS.SIGN.SPECIMEN,
    queryFn: async () => {
      const res = await api.get(API_ROUTES.SIGN.SPECIMEN).json();
      return SignListResponseSchema.parse(res);
    },
  });
  return signSpecimenList;
};

export const useSignUpload = () => {
  const signUpload = useMutation<Sign, Error, FormData>({
    mutationFn: async (formData) => {
      const res = await api
        .post(API_ROUTES.SIGN.UPLOAD, { body: formData })
        .json();
      return SignSchema.parse(res);
    },
  });
  return signUpload;
};
