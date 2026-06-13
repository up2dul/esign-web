import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArchiveIcon,
  FileClockIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { EsignBrand } from "@/components/layout/esign-brand";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getUserInitials } from "@/lib/utils";
import { useUserProfile } from "@/services/queries/user";
import { useAuthStore } from "@/stores/auth-store";
import { Footer } from "./footer";

type VaultShellProps = {
  children: ReactNode;
};

type NavItem = {
  key: string;
  label: string;
  to: string;
};

const topNavItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", to: "/app" },
  { key: "documents", label: "Documents", to: "/app/documents" },
  { key: "profile", label: "Profile", to: "/app/profile" },
];

const sidebarItems = [
  {
    key: "overview",
    label: "Overview",
    to: "/app",
    icon: LayoutGridIcon,
  },
  {
    key: "documents",
    label: "All Documents",
    to: "/app/documents",
    icon: FileTextIcon,
  },
  { key: "pending", label: "Pending", to: "/app/pending", icon: FileClockIcon },
  {
    key: "archived",
    label: "Archived",
    to: "/app/archived",
    icon: ArchiveIcon,
  },
  {
    key: "settings",
    label: "Settings",
    to: "/app/profile",
    icon: SettingsIcon,
  },
] as const;

function getTopSection(pathname: string) {
  if (
    pathname.startsWith("/app/profile") ||
    pathname.startsWith("/app/pending")
  ) {
    return "profile";
  }

  if (pathname.startsWith("/app/documents")) {
    return "documents";
  }

  return "dashboard";
}

function getSidebarSection(pathname: string) {
  if (pathname.startsWith("/app/profile")) {
    return "settings";
  }

  if (pathname.startsWith("/app/pending")) {
    return "pending";
  }

  if (pathname.startsWith("/app/archived")) {
    return "archived";
  }

  if (pathname.startsWith("/app/documents")) {
    return "documents";
  }

  return "overview";
}

export const VaultShell = ({ children }: VaultShellProps) => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const navigate = useNavigate();
  const topSection = getTopSection(pathname);
  const sidebarSection = getSidebarSection(pathname);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const userProfile = useUserProfile();
  const user = userProfile.data?.data;

  function handleSignOut() {
    clearAuth();
    navigate({ to: "/" });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-[#2d1b25]">
      <header className="border-[#e9d7dd]/80 border-b bg-[#f9f4f6]/95 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/app" className="shrink-0" aria-label="Go to dashboard">
              <EsignBrand className="[&_p]:text-[1.2rem]" />
            </Link>
            <nav className="hidden items-center gap-5 md:flex">
              {topNavItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className={cn(
                    "border-transparent border-b-2 px-0.5 pb-1 font-semibold text-[#68545f] text-[0.92rem] transition-colors",
                    topSection === item.key && "border-primary text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button variant="outline" size="sm">
                    Sign Out
                  </Button>
                }
              />
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <LogOutIcon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Sign out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will end your current session and you will need to log
                    in again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-col border-[#eadbe0] bg-[#f6edf0] px-4 py-5 lg:border-r lg:px-5 lg:py-7">
          <div className="rounded-2xl border border-[#ead5dc] bg-[#f4e8ec] p-3">
            <div className="flex items-center gap-2">
              {userProfile.isLoading ? (
                <Skeleton className="size-9 shrink-0 rounded-full" />
              ) : (
                <Avatar size="lg" className="ring-2 ring-white/80">
                  {user?.profile_picture ? (
                    <AvatarImage src={user.profile_picture} alt={user.name} />
                  ) : null}
                  <AvatarFallback>
                    {user ? getUserInitials(user.name) : "—"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="min-w-0">
                {userProfile.isLoading ? (
                  <>
                    <Skeleton className="mb-1 h-4 w-24 rounded" />
                    <Skeleton className="h-3 w-32 rounded" />
                  </>
                ) : (
                  <>
                    <p className="truncate font-bold text-[#2f1c24] text-[0.95rem]">
                      {user?.name ?? "—"}
                    </p>
                    {/** add badge verification */}
                    {user?.is_verified ? (
                      <Badge className="bg-green-500">Verified</Badge>
                    ) : (
                      <Badge className="bg-red-500">Not Verified</Badge>
                    )}
                  </>
                )}
              </div>
            </div>
            <Link
              to="/app/documents"
              className="mt-4 flex h-9 w-full items-center justify-center rounded-lg border border-[#edcfd9] bg-white font-semibold text-[0.84rem] text-primary hover:bg-[#fff4f8]"
            >
              + New Document
            </Link>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = sidebarSection === item.key;

              return (
                <Link
                  key={item.key}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-[#4f3f47] text-[0.86rem] transition-colors",
                    isActive
                      ? "bg-white text-primary shadow-[inset_0_0_0_1px_rgba(188,18,101,0.12)]"
                      : "hover:bg-white/70"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </aside>

        <main className="px-4 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>

      <Footer />
    </div>
  );
};
