import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CircleIcon,
  Edit3Icon,
  FilePenLineIcon,
  FileTextIcon,
  FileUpIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { EsignBrand } from "@/components/layout/esign-brand";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentList, useDocumentSign } from "@/services/queries/document";
import { useSignSpecimenList } from "@/services/queries/sign";

type SignSearch = {
  documentId?: string;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const SignPage = () => {
  const { documentId } = Route.useSearch();

  const documentList = useDocumentList();
  const documentSign = useDocumentSign();
  const signSpecimenList = useSignSpecimenList();

  const [imageError, setImageError] = useState(false);
  const [isSignPickerOpen, setIsSignPickerOpen] = useState(false);
  const [selectedSignId, setSelectedSignId] = useState<string | null>(null);

  const selectedDocument = documentList.data?.data.rows_data.docs.find(
    (document) => document.id === documentId
  );

  const isSigned = selectedDocument?.status === "SIGNED";

  const signs = signSpecimenList.data?.data.rows_data.docs ?? [];

  const selectedSign = signs.find((sign) => sign.id === selectedSignId) ?? null;

  useEffect(() => {
    setImageError(!selectedDocument?.cover_url);
  }, [selectedDocument?.cover_url]);

  useEffect(() => {
    if (documentId !== undefined) {
      setSelectedSignId(null);
      setIsSignPickerOpen(false);
    }
  }, [documentId]);

  const documentName = selectedDocument?.file_name ?? "Dokumen PDF";

  const uploadedDate = selectedDocument?.created_at
    ? formatDate(selectedDocument.created_at)
    : "-";

  const selectSignature = (signId: string) => {
    setSelectedSignId(signId);
    setIsSignPickerOpen(false);
  };

  const removeSignature = () => {
    setSelectedSignId(null);
    setIsSignPickerOpen(false);
  };

  const handleFinishSigning = async () => {
    if (!documentId || !selectedSignId) return;

    try {
      await documentSign.mutateAsync({
        document_id: documentId,
        sign_id: selectedSignId,
        metadata: {
          koor_x: 360,
          koor_y: 560,
          width: 160,
          height: 70,
          page: 1,
        },
      });

      await documentList.refetch();

      alert("Dokumen berhasil ditandatangani!");
    } catch (error) {
      console.error(error);
      alert("Gagal menandatangani dokumen");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f6e7ec] text-[#2d1b25]">
      <header className="border-[#ead4dc] border-b bg-[#faf4f7]">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-5">
            <EsignBrand className="[&_p]:text-[1.2rem]" />

            <div className="min-w-0">
              <p className="max-w-[390px] truncate font-semibold text-[#2f2028] text-[0.9rem]">
                {documentName}
              </p>
              <p className="font-semibold text-[#8f7b84] text-[0.64rem] uppercase tracking-[0.14em]">
                {isSigned
                  ? "Step 3 of 3: Complete"
                  : "Step 2 of 3: Finalize Signature"}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/app"
              className="font-semibold text-[0.86rem] text-primary"
            >
              Save & Exit
            </Link>

            <Button
              type="button"
              onClick={handleFinishSigning}
              disabled={!selectedSign || documentSign.isPending || isSigned}
              title={
                isSigned
                  ? "Dokumen sudah ditandatangani"
                  : !selectedSign
                    ? "Pilih tanda tangan terlebih dahulu"
                    : "Selesaikan proses tanda tangan"
              }
              className="h-10 rounded-lg px-8"
            >
              {documentSign.isPending
                ? "Signing..."
                : isSigned
                  ? "Signed"
                  : "Finish"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-5 px-4 py-8 lg:grid-cols-[230px_1fr] lg:px-8 lg:py-8">
        <aside className="space-y-6">
          <div>
            <p className="font-black text-[#7d6872] text-[0.68rem] uppercase tracking-[0.2em]">
              Document Progress
            </p>

            <div className="mt-4 space-y-3 font-semibold text-[0.88rem]">
              <p className="flex items-center gap-2 text-[#2f2028]">
                <span className="grid size-6 place-content-center rounded-full bg-[#0b8d4b] text-white">
                  ✓
                </span>
                Review Details
              </p>

              <p className="flex items-center gap-2 text-[#2f2028]">
                <span
                  className={`grid size-6 place-content-center rounded-full ${
                    isSigned
                      ? "bg-[#0b8d4b] text-white"
                      : "border border-primary text-primary"
                  }`}
                >
                  {isSigned ? "✓" : "2"}
                </span>
                Place Signature
              </p>

              <p
                className={`flex items-center gap-2 ${
                  isSigned ? "text-[#2f2028]" : "text-[#a48d97]"
                }`}
              >
                <span
                  className={`grid size-6 place-content-center rounded-full ${
                    isSigned ? "bg-[#0b8d4b] text-white" : "bg-[#e9d8df]"
                  }`}
                >
                  {isSigned ? "✓" : "3"}
                </span>
                Complete
              </p>
            </div>
          </div>

          <div>
            <p className="font-black text-[#7d6872] text-[0.68rem] uppercase tracking-[0.2em]">
              Required Fields
            </p>

            <Card className="mt-4 rounded-xl border border-[#ead7de] bg-[#f9f3f5] py-0 ring-0">
              <CardContent className="space-y-2 px-3 py-3">
                <div className="rounded-lg bg-white px-3 py-2">
                  <p className="font-bold text-[0.87rem]">Main Signature</p>
                  <p
                    className={`text-[0.72rem] ${
                      selectedSign || isSigned
                        ? "text-[#0b8d4b]"
                        : "text-[#8b767f]"
                    }`}
                  >
                    {isSigned
                      ? "Document signed"
                      : selectedSign
                        ? "Signature selected"
                        : "Signature required"}
                  </p>
                </div>

                <div className="rounded-lg bg-[#f6eef1] px-3 py-2">
                  <p className="font-bold text-[#8c7780] text-[0.87rem]">
                    Initials
                  </p>
                  <p className="text-[#ae97a2] text-[0.72rem]">
                    Optional field
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        <section className="space-y-5">
          {documentList.isPending && (
            <Card className="rounded-xl border border-[#ebd8de] bg-white py-0 ring-0">
              <CardContent className="p-10 text-center text-[#7d6872]">
                Memuat dokumen...
              </CardContent>
            </Card>
          )}

          {documentList.isError && (
            <Card className="rounded-xl border border-red-200 bg-red-50 py-0 ring-0">
              <CardContent className="p-10 text-center">
                <p className="font-semibold text-red-700">
                  Gagal memuat dokumen.
                </p>
                <p className="mt-2 text-red-600 text-sm">
                  {documentList.error.message}
                </p>
              </CardContent>
            </Card>
          )}

          {!documentList.isPending && !documentList.isError && !documentId && (
            <Card className="rounded-xl border border-[#ebd8de] bg-white py-0 ring-0">
              <CardContent className="p-10 text-center">
                <p className="font-semibold text-[#2d1b25]">
                  Dokumen belum dipilih.
                </p>

                <Link to="/app">
                  <Button className="mt-5 rounded-lg">
                    Kembali ke Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {!documentList.isPending &&
            !documentList.isError &&
            documentId &&
            !selectedDocument && (
              <Card className="rounded-xl border border-[#ebd8de] bg-white py-0 ring-0">
                <CardContent className="p-10 text-center">
                  <p className="font-semibold text-[#2d1b25]">
                    Dokumen tidak ditemukan.
                  </p>

                  <Link to="/app">
                    <Button className="mt-5 rounded-lg">
                      Kembali ke Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

          {selectedDocument && (
            <>
              <Card className="rounded-none border border-[#ebd8de] bg-white py-0 shadow-[0_20px_40px_-35px_rgba(82,28,54,0.42)] ring-0">
                <CardContent className="space-y-7 px-8 py-8">
                  <div className="space-y-3">
                    <h1 className="break-words font-black text-[#2d1b25] text-xl">
                      {documentName}
                    </h1>

                    <p className="text-[#8f7b84] text-sm">
                      Uploaded {uploadedDate} · Status{" "}
                      <span
                        className={`font-semibold uppercase ${
                          isSigned ? "text-[#0b8d4b]" : ""
                        }`}
                      >
                        {selectedDocument.status}
                      </span>
                    </p>
                  </div>

                  {selectedDocument.cover_url && !imageError ? (
                    <div className="overflow-hidden rounded-md border border-[#f1e4e8] bg-white">
                      <img
                        src={selectedDocument.cover_url}
                        alt={documentName}
                        className="mx-auto max-h-[680px] w-full object-contain"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ) : (
                    <div className="grid h-[430px] place-content-center rounded-md bg-[#f8f0f3] text-[#bda3ad]">
                      <div className="text-center">
                        <FileTextIcon className="mx-auto size-16" />
                        <p className="mt-4 font-bold">Preview tidak tersedia</p>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-8 border-[#f2e6eb] border-t pt-8 md:grid-cols-2">
                    <div>
                      <p className="font-black text-[#8f7b84] text-[0.62rem] uppercase tracking-[0.2em]">
                        Document Owner
                      </p>

                      <div className="mt-3 grid h-22 place-content-center rounded-lg border border-[#ecc9d5] border-dashed bg-[#f8ecf0] text-[#a78d98] text-[0.76rem]">
                        Original Document
                      </div>
                    </div>

                    <div>
                      <p className="font-black text-[0.62rem] text-primary uppercase tracking-[0.2em]">
                        Candidate Signature
                      </p>

                      <div className="relative mt-3">
                        <button
                          type="button"
                          onClick={() =>
                            !isSigned &&
                            setIsSignPickerOpen((current) => !current)
                          }
                          disabled={isSigned}
                          className="relative grid min-h-22 w-full cursor-pointer place-content-center rounded-lg border border-primary border-dashed bg-[#fef4f8] px-4 py-3 text-primary transition hover:bg-[#fbeaf1] disabled:cursor-not-allowed disabled:opacity-80"
                        >
                          <span className="absolute top-2 right-2">
                            <CircleIcon className="size-2.5 fill-current stroke-current" />
                          </span>

                          {selectedSign ? (
                            <div className="text-center">
                              <img
                                src={selectedSign.preview_url}
                                alt="Selected signature"
                                className="mx-auto max-h-14 max-w-44 object-contain"
                              />
                              <p className="mt-2 font-semibold text-[0.72rem]">
                                {isSigned
                                  ? "Sudah ditandatangani"
                                  : "Klik untuk mengganti"}
                              </p>
                            </div>
                          ) : isSigned ? (
                            <div className="text-center">
                              <span className="mx-auto grid size-8 place-content-center rounded-full bg-[#0b8d4b] text-white">
                                ✓
                              </span>
                              <p className="mt-2 font-semibold text-[0.78rem]">
                                Dokumen sudah ditandatangani
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <span className="mx-auto grid size-8 place-content-center rounded-full bg-primary text-white">
                                ✎
                              </span>
                              <p className="mt-2 font-semibold text-[0.78rem]">
                                Sign Here
                              </p>
                            </div>
                          )}
                        </button>

                        {isSignPickerOpen && !isSigned && (
                          <div className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-20 rounded-xl border border-[#ead7de] bg-white p-3 shadow-xl">
                            <p className="mb-3 font-bold text-[#2d1b25] text-sm">
                              Pilih tanda tangan
                            </p>

                            {signSpecimenList.isPending && (
                              <p className="py-4 text-center text-[#8f7b84] text-sm">
                                Memuat tanda tangan...
                              </p>
                            )}

                            {signSpecimenList.isError && (
                              <p className="py-4 text-center text-red-600 text-sm">
                                Gagal mengambil tanda tangan.
                              </p>
                            )}

                            {!signSpecimenList.isPending &&
                              !signSpecimenList.isError &&
                              signs.length === 0 && (
                                <div className="py-3 text-center">
                                  <p className="text-[#8f7b84] text-sm">
                                    Belum ada tanda tangan tersimpan.
                                  </p>

                                  <Link to="/app/profile">
                                    <Button
                                      size="sm"
                                      className="mt-3 rounded-md"
                                    >
                                      Upload di Profile
                                    </Button>
                                  </Link>
                                </div>
                              )}

                            {!signSpecimenList.isPending &&
                              !signSpecimenList.isError &&
                              signs.length > 0 && (
                                <div className="grid gap-2">
                                  {signs.map((sign) => (
                                    <button
                                      type="button"
                                      key={sign.id}
                                      onClick={() => selectSignature(sign.id)}
                                      className={`flex w-full items-center justify-between rounded-lg border p-2 transition ${
                                        selectedSignId === sign.id
                                          ? "border-primary bg-[#fef4f8]"
                                          : "border-[#f0dfe5] bg-white hover:bg-[#faf3f6]"
                                      }`}
                                    >
                                      <img
                                        src={sign.preview_url}
                                        alt="Signature option"
                                        className="h-12 w-32 object-contain"
                                      />

                                      <span className="pr-2 font-semibold text-[#7d6872] text-xs">
                                        {selectedSignId === sign.id
                                          ? "Selected"
                                          : "Pilih"}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                    <div>
                      <p className="font-black text-[#8f7b84] text-[0.62rem] uppercase tracking-[0.2em]">
                        Initials
                      </p>

                      <div className="mt-3 grid h-11 w-24 place-content-center rounded-lg border border-[#ecd7de] bg-[#f7edf1] text-[#a58b95]">
                        +
                      </div>
                    </div>

                    <div>
                      <p className="font-black text-[#8f7b84] text-[0.62rem] uppercase tracking-[0.2em]">
                        Date Uploaded
                      </p>

                      <div className="mt-3 border-[#ecdee4] border-b pb-2 text-[0.92rem]">
                        {uploadedDate}
                      </div>
                    </div>
                  </div>

                  {isSigned ? (
                    <p className="rounded-lg bg-[#eef9f2] px-4 py-3 text-[#0b8d4b] text-sm">
                      Dokumen sudah berhasil ditandatangani.
                    </p>
                  ) : selectedSign ? (
                    <p className="rounded-lg bg-[#eef9f2] px-4 py-3 text-[#0b8d4b] text-sm">
                      Tanda tangan sudah dipilih. Klik tombol Finish untuk
                      menyelesaikan proses tanda tangan.
                    </p>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="mx-auto w-fit rounded-xl border border-[#ead7de] bg-[#f9f3f5] py-0 ring-0">
                <CardContent className="flex items-center gap-3 px-3 py-2">
                  <Button
                    variant="secondary"
                    className="h-8 rounded-md bg-white px-3 text-[#5f4f56] text-[0.78rem]"
                    disabled={isSigned}
                  >
                    <FilePenLineIcon data-icon="inline-start" />
                    Type
                  </Button>

                  <Button
                    variant="ghost"
                    className="h-8 rounded-md px-3 text-[#7b6771] text-[0.78rem]"
                    disabled={isSigned}
                  >
                    <Edit3Icon data-icon="inline-start" />
                    Draw
                  </Button>

                  <Link to="/app/profile">
                    <Button
                      variant="ghost"
                      className="h-8 rounded-md px-3 text-[#7b6771] text-[0.78rem]"
                      disabled={isSigned}
                    >
                      <FileUpIcon data-icon="inline-start" />
                      Upload
                    </Button>
                  </Link>

                  <Button
                    type="button"
                    variant="ghost"
                    disabled={!selectedSign || isSigned}
                    onClick={removeSignature}
                    className="h-8 rounded-md px-3 text-[#7b6771] text-[0.78rem]"
                  >
                    <Trash2Icon data-icon="inline-start" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export const Route = createFileRoute("/app/sign")({
  validateSearch: (search: Record<string, unknown>): SignSearch => ({
    documentId:
      typeof search.documentId === "string" ? search.documentId : undefined,
  }),
  component: SignPage,
});
