import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { AuthLayout } from "@/components/layout/auth-layout";
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
  head: () => ({
    meta: [{ title: "Esign" }],
  }),
  beforeLoad: async () => {
    try {
      await api.get(API_ROUTES.USER.PROFILE).json();
    } catch (error) {
      if (!isHTTPError(error)) {
        return;
      }
      if (error.response.status === 401) {
        return;
      }
      throw redirect({ to: "/app" });
    }
    throw redirect({ to: "/app" });
  },
  component: AuthLayoutComponent,
});
