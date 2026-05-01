import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, FileTextIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ArchivedPage = () => {
  return (
    <div className="space-y-7">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
            Archived Files
          </h1>
          <p className="mt-2 text-[#705c67]">
            Securely stored records retained for compliance and auditability.
          </p>
        </div>
        <Button
          variant="outline"
          className="h-10 rounded-lg border-[#ebd2db] bg-[#f8edf1] text-primary"
        >
          <DownloadIcon data-icon="inline-start" />
          Export Archive Index
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {["NDA-2024", "Audit Memo", "Partner Agreement"].map((document) => (
          <Card
            key={document}
            className="rounded-2xl border border-[#ead9de] bg-[#faf1f4] py-0 ring-0"
          >
            <CardHeader className="space-y-2 px-4 pt-4 pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="font-black text-[#2e1d27] text-[1.6rem] tracking-[-0.03em]">
                  {document}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="rounded-full border-[#dfc2cd] bg-white px-2 text-[#8e7280] text-[0.62rem] uppercase tracking-widest"
                >
                  Archived
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-4">
              <div className="grid h-32 place-content-center rounded-lg bg-white text-[#a68995]">
                <FileTextIcon className="size-7" />
              </div>
              <div className="space-y-1.5">
                <p className="text-[#5f4f57] text-[0.85rem]">
                  Last modified: Oct 12, 2023
                </p>
                <p className="font-bold text-[#2b1823] text-[0.93rem]">
                  File ID: {document.toLowerCase().replace(" ", "-")}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export const Route = createFileRoute("/app/archived")({
  component: ArchivedPage,
});
