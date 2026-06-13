import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiErrorResponseSchema } from "@/lib/schemas/auth";
import type { SignListResponse } from "@/lib/schemas/sign";
import { SignListResponseSchema } from "@/lib/schemas/sign";
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
  const queryClient = useQueryClient();
  const signUpload = useMutation<unknown, Error, FormData>({
    mutationFn: async (formData) => {
      try {
        return await api
          .post(API_ROUTES.SIGN.UPLOAD, { body: formData })
          .json();
      } catch (err: unknown) {
        const error = err as { data?: unknown };
        const errorData = error?.data ?? null;
        const parsed = ApiErrorResponseSchema.safeParse(errorData);
        const message = parsed.success
          ? parsed.data.message
          : "Failed to upload signature";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SIGN.SPECIMEN });
      toast.success("Signature uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload signature");
    },
  });
  return signUpload;
};
