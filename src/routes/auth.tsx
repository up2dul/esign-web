import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layout/auth-layout";

const AuthLayoutComponent = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export const Route = createFileRoute("/auth")({
  component: AuthLayoutComponent,
});
