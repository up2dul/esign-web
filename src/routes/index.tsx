import { createFileRoute, redirect } from "@tanstack/react-router";
import { UserProfileResponseSchema } from "@/lib/schemas/user";
import { api } from "@/services/api";
import { API_ROUTES } from "@/services/api-config";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ location }) => {
    try {
      const res = await api.get(API_ROUTES.USER.PROFILE).json();
      UserProfileResponseSchema.parse(res);
      throw redirect({
        to: "/app",
      });
    } catch {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
