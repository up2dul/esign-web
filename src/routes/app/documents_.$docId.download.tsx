import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon, DownloadIcon, FileCheck2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Document as PdfDocument, Page as PdfPage } from "react-pdf";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/services/api";
import { API_ROUTES } from "@/services/api-config";
import { useDocumentPreview } from "@/services/queries/document";

function renderPdfPages(numPages: number) {
  return Array.from({ length: numPages }, (_, index) => (
    <div
      // biome-ignore lint/suspicious/noArrayIndexKey: static PDF pages, never reordered
      key={`page_${index}`}
      className="relative bg-white shadow-lg"
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <PdfPage
        pageNumber={index + 1}
        width={600}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </div>
  ));
}

const DownloadPage = () => {
  const { docId } = Route.useParams();
  const navigate = useNavigate();
  const documentPreview = useDocumentPreview(docId, "signed");

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const pageElements = renderPdfPages(numPages);

  useEffect(() => {
    const bufData = (documentPreview.data?.buffer as any)?.data;
    if (bufData) {
      const bytes = new Uint8Array(bufData);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPdfUrl(null);
  }, [documentPreview.data]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const blob = await api
        .get(API_ROUTES.DOCUMENT.DOWNLOAD(docId, "signed"))
        .blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Signed_Document_${docId.slice(0, 8)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download document", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fade-in animate-in space-y-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
            Signed Document
          </h1>
          <p className="mt-2 text-[#705c67]">
            Preview and download your finalized signature document.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/app" })}
          className="gap-2"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Button>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* PDF Preview */}
        <div className="flex h-200 flex-col items-center overflow-y-auto rounded-2xl border border-[#ebdbe0] bg-[#eef0f2] p-6 shadow-inner">
          {documentPreview.isLoading && (
            <p className="text-[#a39098]">Loading document...</p>
          )}
          {pdfUrl && (
            <PdfDocument
              file={pdfUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={console.error}
              className="space-y-8"
            >
              {pageElements}
            </PdfDocument>
          )}
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="rounded-2xl border border-[#ebdbe0] bg-white py-0 ring-0">
            <CardContent className="space-y-6 px-6 py-6">
              <div className="flex items-center gap-4 border-[#f0e6e9] border-b pb-5">
                <FileCheck2Icon className="size-8 text-green-500" />
                <div>
                  <p className="font-black text-[#2b1823] text-[1.2rem]">
                    Successfully Signed
                  </p>
                  <p className="text-[#705c67] text-[0.84rem]">
                    Ready for download.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <p className="font-semibold text-[#a39098] text-[0.75rem] uppercase tracking-wider">
                    Document ID
                  </p>
                  <p className="truncate font-medium text-[#2b1823] text-[0.84rem]">
                    {docId}
                  </p>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <p className="font-semibold text-[#a39098] text-[0.75rem] uppercase tracking-wider">
                    Total Pages
                  </p>
                  <p className="font-medium text-[#2b1823] text-[0.84rem]">
                    {numPages || "..."}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="w-full gap-2"
                  onClick={handleDownload}
                  disabled={isDownloading || !pdfUrl}
                >
                  <DownloadIcon className="size-4" />
                  {isDownloading ? "Downloading..." : "Download File"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/app/documents_/$docId/download")({
  head: () => ({
    meta: [{ title: "Download Document - Esign" }],
  }),
  component: DownloadPage,
});
