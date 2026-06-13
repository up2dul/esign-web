import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

import "../index.css";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        title: "Esign",
      },
      {
        name: "description",
        content: "Secure digital signature platform",
      },
    ],
  }),
  component: RootComponent,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <Outlet />
      <Toaster richColors theme="light" />
    </QueryClientProvider>
  );
}
