import { Grid2X2Icon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const documents = [
  {
    title: "Design Brief",
    status: "Pending",
    statusClass: "bg-[#ffdce8] text-[#b90d5b]",
    modified: "Modified 2 hours ago",
    coverClass:
      "bg-[linear-gradient(150deg,#f6eff2_0%,#f2e8ec_50%,#f9f2f5_100%)] text-[#ddb8c5]",
  },
  {
    title: "Project Brief",
    status: "Signed",
    statusClass: "bg-[#d6f6df] text-[#128043]",
    modified: "Modified Oct 24, 2024",
    coverClass:
      "bg-[linear-gradient(135deg,#1f2028_0%,#3c3d47_45%,#2f313a_100%)] text-[#8f95a8]",
  },
  {
    title: "Business Proposal",
    status: "Draft",
    statusClass: "bg-[#efe4e8] text-[#9f7784]",
    modified: "Modified Oct 20, 2024",
    coverClass:
      "bg-[linear-gradient(130deg,#f4f5f6_0%,#eceef0_55%,#f5f6f8_100%)] text-[#d8bec8]",
  },
] as const;

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-black text-5xl tracking-[-0.03em] text-[#2b1823]">Documents</h1>
        <p className="mt-2 text-[#705c67]">Manage your curated signature collection.</p>
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
          <Button variant="outline" size="icon" className="size-9 rounded-lg border-[#ecd6dd] bg-[#f8eef2] text-[#6c5a63]">
            <SlidersHorizontalIcon />
          </Button>
          <Button variant="outline" size="icon" className="size-9 rounded-lg border-[#ecd6dd] bg-[#f8eef2] text-[#6c5a63]">
            <Grid2X2Icon />
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {documents.map((document) => (
          <Card
            key={document.title}
            className="overflow-hidden rounded-2xl border border-[#eedde3] bg-[#f7ecef] py-0 ring-0"
          >
            <div
              className={`mx-4 mt-4 grid h-56 place-content-center rounded-xl text-center ${document.coverClass}`}
            >
              <div className="space-y-2 opacity-70">
                <div className="mx-auto h-2 w-24 rounded bg-current/50" />
                <div className="mx-auto h-2 w-20 rounded bg-current/35" />
                <div className="mx-auto mt-10 h-8 w-16 rounded-lg border border-current/40" />
              </div>
            </div>
            <CardHeader className="space-y-3 px-4 pt-5 pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="font-black text-[1.85rem] leading-[1.05] tracking-[-0.02em] text-[#2e1d27]">
                  {document.title}
                </CardTitle>
                <Badge className={`rounded-full px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] ${document.statusClass}`}>
                  {document.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-5 text-[0.78rem] font-semibold text-[#8a7580]">
              {document.modified}
            </CardContent>
          </Card>
        ))}

        <Card className="grid min-h-88.75 place-content-center rounded-2xl border border-dashed border-[#efc6d3] bg-[#f9eff2] py-0 text-center ring-0">
          <CardContent className="space-y-3 px-6 py-8">
            <span className="mx-auto grid size-12 place-content-center rounded-full bg-[#f6dbe5] text-primary">
              <span className="text-3xl leading-none">+</span>
            </span>
            <div>
              <p className="font-black text-[1.35rem] text-[#2b1823]">New Document</p>
              <p className="mt-1 text-[0.84rem] text-[#7b6771]">Upload PDF or Docx</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});
