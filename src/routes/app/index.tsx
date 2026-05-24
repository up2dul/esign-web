import { createFileRoute } from "@tanstack/react-router";
import { Grid2X2Icon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentList } from "@/services/queries/document";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusStyle(status: string): string {
  if (status === "SIGNED") return "bg-[#d6f6df] text-[#128043]";
  if (status === "DRAFT") return "bg-[#efe4e8] text-[#9f7784]";
  return "bg-[#ffdce8] text-[#b90d5b]";
}

const DashboardPage = () => {
  const documentList = useDocumentList();
  const docs = documentList.data?.data.rows_data.docs ?? [];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
          Documents
        </h1>
        <p className="mt-2 text-[#705c67]">
          Manage your curated signature collection.
        </p>
      </section>

      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#b99aa6]" />
          <Input
            placeholder="Search documents..."
            className="h-11 rounded-xl border-[#ecd9df] bg-white pl-10 text-[0.92rem]"
          />
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-[#ecd6dd] bg-[#f8eef2] text-[#6c5a63]"
          >
            <SlidersHorizontalIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-[#ecd6dd] bg-[#f8eef2] text-[#6c5a63]"
          >
            <Grid2X2Icon />
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {documentList.isLoading ? (
          [1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="overflow-hidden rounded-2xl border border-[#eedde3] bg-[#f7ecef]"
            >
              <Skeleton className="mx-4 mt-4 h-56 rounded-xl" />
              <div className="space-y-3 px-4 pt-5 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-7 w-32 rounded" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            </div>
          ))
        ) : docs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
            <p className="font-semibold text-[#7a6570] text-[0.9rem]">
              No documents yet
            </p>
            <p className="text-[#9d8891] text-[0.8rem]">
              Upload a document to get started.
            </p>
          </div>
        ) : (
          docs.map((doc) => (
            <Card
              key={doc.id}
              className="overflow-hidden rounded-2xl border border-[#eedde3] bg-[#f7ecef] py-0 ring-0"
            >
              <div className="mx-4 mt-4 h-56 overflow-hidden rounded-xl bg-[#f2e8ec]">
                {doc.cover_url ? (
                  <img
                    src={doc.cover_url}
                    alt="Document cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full place-content-center text-[#ddb8c5]">
                    <div className="space-y-2 opacity-70">
                      <div className="mx-auto h-2 w-24 rounded bg-current/50" />
                      <div className="mx-auto h-2 w-20 rounded bg-current/35" />
                      <div className="mx-auto mt-10 h-8 w-16 rounded-lg border border-current/40" />
                    </div>
                  </div>
                )}
              </div>
              <CardHeader className="space-y-3 px-4 pt-5 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="truncate font-black text-[#2e1d27] text-[1.1rem] leading-[1.2] tracking-[-0.01em]">
                    {doc.id.slice(0, 8).toUpperCase()}
                  </CardTitle>
                  <Badge
                    className={`shrink-0 rounded-full px-2.5 py-0.5 font-bold text-[0.58rem] uppercase tracking-[0.12em] ${getStatusStyle(doc.status)}`}
                  >
                    {doc.status}
                  </Badge>
                </div>
                <p className="font-medium text-[#8a7a82] text-[0.78rem]">
                  {formatDate(doc.created_at)}
                </p>
              </CardHeader>
            </Card>
          ))
        )}
      </section>
    </div>
  );
};

export const Route = createFileRoute("/app/")({
  component: DashboardPage,
});
