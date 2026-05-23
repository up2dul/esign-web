import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileTextIcon,
  Grid2X2Icon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Document } from "@/lib/schemas/document";
import { useDocumentList } from "@/services/queries/document";

const getStatusLabel = (status: Document["status"]) => {
  return status === "SIGNED" ? "Signed" : "Draft";
};

const getStatusClass = (status: Document["status"]) => {
  return status === "SIGNED"
    ? "bg-[#d6f6df] text-[#128043]"
    : "bg-[#ffdce8] text-[#b90d5b]";
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const DocumentCover = ({ document }: { document: Document }) => {
  const [imageError, setImageError] = useState(false);

  if (document.cover_url && !imageError) {
    return (
      <img
        src={document.cover_url}
        alt={document.file_name ?? "Document cover"}
        className="mx-4 mt-4 h-56 w-[calc(100%-2rem)] rounded-xl object-cover"
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div className="mx-4 mt-4 grid h-56 place-content-center rounded-xl bg-[linear-gradient(150deg,#f6eff2_0%,#f2e8ec_50%,#f9f2f5_100%)] text-center text-[#ddb8c5]">
      <FileTextIcon className="mx-auto size-12 opacity-60" />
      <p className="mt-3 font-semibold text-sm">PDF Document</p>
    </div>
  );
};

const DashboardPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const documentList = useDocumentList();

  const documents = documentList.data?.data.rows_data.docs ?? [];

  const filteredDocuments = documents.filter((document, index) => {
    const keyword = searchValue.trim().toLowerCase();

    if (!keyword) {
      return true;
    }

    const title = (document.file_name ?? `document ${index + 1}`).toLowerCase();

    const status = getStatusLabel(document.status).toLowerCase();

    return title.includes(keyword) || status.includes(keyword);
  });

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
            Documents
          </h1>

          <p className="mt-2 text-[#705c67]">
            Manage your curated signature collection.
          </p>
        </div>

        <Link to="/app/documents">
          <Button className="h-11 rounded-lg bg-[#a42c52] px-6 text-white hover:bg-[#8f2647]">
            Upload Document
          </Button>
        </Link>
      </section>

      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#b99aa6]" />

          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search documents..."
            className="h-11 rounded-xl border-[#ecd9df] bg-white pl-10 text-[0.92rem]"
          />
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-[#ecd6dd] bg-[#f8eef2] text-[#6c5a63]"
          >
            <SlidersHorizontalIcon className="size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-[#ecd6dd] bg-[#f8eef2] text-[#6c5a63]"
          >
            <Grid2X2Icon className="size-4" />
          </Button>
        </div>
      </section>

      {documentList.isPending && (
        <section className="rounded-2xl border border-[#eedde3] bg-[#f7ecef] p-10 text-center text-[#705c67]">
          Memuat dokumen...
        </section>
      )}

      {documentList.isError && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
          <h2 className="font-bold text-red-700">Gagal memuat dokumen</h2>

          <p className="mt-2 text-sm text-red-600">
            {documentList.error.message}
          </p>
        </section>
      )}

      {!documentList.isPending &&
        !documentList.isError &&
        documents.length === 0 && (
          <section className="rounded-2xl border border-[#eedde3] bg-[#f7ecef] p-10 text-center">
            <FileTextIcon className="mx-auto size-12 text-[#b90d5b]" />

            <h2 className="mt-4 font-black text-2xl text-[#2e1d27]">
              Belum ada dokumen
            </h2>

            <p className="mt-2 text-[#705c67]">
              Upload PDF pertama Anda untuk mulai menggunakan ESIGN.
            </p>

            <Link to="/app/documents">
              <Button className="mt-6 h-11 rounded-lg bg-[#a42c52] px-7 text-white hover:bg-[#8f2647]">
                Upload PDF
              </Button>
            </Link>
          </section>
        )}

      {!documentList.isPending &&
        !documentList.isError &&
        documents.length > 0 &&
        filteredDocuments.length === 0 && (
          <section className="rounded-2xl border border-[#eedde3] bg-[#f7ecef] p-10 text-center text-[#705c67]">
            Dokumen tidak ditemukan.
          </section>
        )}

      {!documentList.isPending &&
        !documentList.isError &&
        filteredDocuments.length > 0 && (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredDocuments.map((document, index) => (
              <Link
                key={document.id}
                to="/app/sign"
                search={{ documentId: document.id }}
                className="block"
              >
                <Card className="cursor-pointer overflow-hidden rounded-2xl border border-[#eedde3] bg-[#f7ecef] py-0 ring-0 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <DocumentCover document={document} />

                  <CardHeader className="space-y-3 px-4 pt-5 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="line-clamp-2 break-words font-black text-[#2e1d27] text-[1.2rem] leading-[1.2] tracking-[-0.02em]">
                        {document.file_name ?? `Document ${index + 1}`}
                      </CardTitle>

                      <Badge
                        className={`shrink-0 rounded-full px-2.5 py-0.5 font-bold text-[0.58rem] uppercase tracking-[0.12em] ${getStatusClass(
                          document.status
                        )}`}
                      >
                        {getStatusLabel(document.status)}
                      </Badge>
                    </div>

                    <p className="font-medium text-[#8a7a82] text-[0.78rem]">
                      Uploaded {formatDate(document.created_at)}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </section>
        )}
    </div>
  );
};

export const Route = createFileRoute("/app/")({
  component: DashboardPage,
});
