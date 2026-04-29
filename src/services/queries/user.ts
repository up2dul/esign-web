import { useQuery } from "@tanstack/react-query";
import type { UserProfileResponse } from "@/lib/schemas/user";
import { UserProfileResponseSchema } from "@/lib/schemas/user";
import { api } from "@/services/api";
import { API_ROUTES, QUERY_KEYS } from "@/services/api-config";

export const useUserProfile = () => {
  const userProfile = useQuery<UserProfileResponse>({
    queryKey: QUERY_KEYS.USER.PROFILE,
    queryFn: async () => {
      const res = await api.get(API_ROUTES.USER.PROFILE).json();
      return UserProfileResponseSchema.parse(res);
    },
  });
  return userProfile;
};
