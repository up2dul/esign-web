import { Outlet, createFileRoute } from "@tanstack/react-router";

import { VaultShell } from "@/components/layout/vault-shell";

const AppLayout = () => {
  return (
    <VaultShell>
      <Outlet />
    </VaultShell>
  );
};

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});
