import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/auth-layout";
import { UserProfileResponseSchema } from "@/lib/schemas/user";
import { api } from "@/services/api";
import { API_ROUTES } from "@/services/api-config";

const AuthLayoutComponent = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export const Route = createFileRoute("/auth")({
  beforeLoad: async () => {
    try {
      const res = await api.get(API_ROUTES.USER.PROFILE).json();
      UserProfileResponseSchema.parse(res);
      // already authenticated -> redirect to app
      throw redirect({ to: "/app" });
    } catch {
      // not authenticated or profile fetch failed -> continue to auth routes
      return;
    }
  },
  component: AuthLayoutComponent,
});
