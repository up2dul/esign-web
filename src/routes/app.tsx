import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { VaultShell } from "@/components/layout/vault-shell";
import { UserProfileResponseSchema } from "@/lib/schemas/user";
import { api } from "@/services/api";
import { API_ROUTES } from "@/services/api-config";

const AppLayout = () => {
  return (
    <VaultShell>
      <Outlet />
    </VaultShell>
  );
};

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [{ title: "Vault - Esign" }],
  }),
  beforeLoad: async ({ location }) => {
    try {
      const res = await api.get(API_ROUTES.USER.PROFILE).json();
      UserProfileResponseSchema.parse(res);
      // profile exists and is valid
      return;
    } catch {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AppLayout,
});
