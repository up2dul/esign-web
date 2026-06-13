import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2Icon,
  FileUpIcon,
  Maximize2Icon,
  PenLineIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Document as PdfDocument, Page as PdfPage, pdfjs } from "react-pdf";

import { z } from "zod";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Document } from "@/lib/schemas/document";
import type { SignSpecimen } from "@/lib/schemas/sign";
import {
  useDocumentPreview,
  useDocumentSign,
  useDocumentUpload,
} from "@/services/queries/document";
import { useSignSpecimenList } from "@/services/queries/sign";

// Setup PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ACCEPTED_TYPES = ["application/pdf"];
const MAX_SIZE_MB = 25;
const A4_WIDTH = 595;
const A4_HEIGHT = 842;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const DocumentsPage = () => {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1 State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedDoc, setUploadedDoc] = useState<Document | null>(null);

  // Step 2 State
  const [selectedSign, setSelectedSign] = useState<SignSpecimen | null>(null);
  const [targetPage, setTargetPage] = useState<number>(1);
  const [signPos, setSignPos] = useState({
    x: 0.1,
    y: 0.1,
    width: 0.3,
    height: 0.1,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageDimensions, setPageDimensions] = useState<
    Record<number, { width: number; height: number }>
  >({});

  // Container sizing
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(500);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  // Queries & Mutations
  const documentUpload = useDocumentUpload();
  const documentSign = useDocumentSign();
  const signSpecimenList = useSignSpecimenList();
  const documentPreview = useDocumentPreview(
    currentStep > 1 && uploadedDoc ? uploadedDoc.id : ""
  );

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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

  useEffect(() => {
    // If we land on this page with a docId search param, automatically jump to step 2
    if (search.docId && !uploadedDoc) {
      setUploadedDoc({ id: search.docId } as Document);
      setCurrentStep(2);
    }
  }, [search.docId, uploadedDoc]);

  // ---------------------------------------------------------------------------
  // Step 1 Handlers
  // ---------------------------------------------------------------------------
  const handleFile = useCallback(
    (incoming: File) => {
      setError(null);
      setUploadedDoc(null);
      documentUpload.reset();

      if (!ACCEPTED_TYPES.includes(incoming.type)) {
        setError("Only PDF files are accepted.");
        return;
      }

      if (incoming.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`File must be smaller than ${MAX_SIZE_MB} MB.`);
        return;
      }

      setFile(incoming);
      setPreviewUrl(URL.createObjectURL(incoming));
    },
    [documentUpload]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = e.target.files?.[0];
      if (picked) handleFile(picked);
      e.target.value = "";
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
    setUploadedDoc(null);
    documentUpload.reset();
  }, [previewUrl, documentUpload]);

  const handleUpload = useCallback(async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("files", file);
    try {
      const res = await documentUpload.mutateAsync(formData);
      setUploadedDoc(res);
      setCurrentStep(2);
    } catch (err) {
      console.error("Upload failed", err);
    }
  }, [file, documentUpload]);

  // ---------------------------------------------------------------------------
  // Step 2 Interactions (Drag & Drop & Resize)
  // ---------------------------------------------------------------------------
  const handlePointerDownDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!selectedSign) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [selectedSign]
  );

  const handlePointerDownResize = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMovePage = useCallback(
    (e: React.PointerEvent, pageNum: number) => {
      if (!containerRef.current) return;
      if (!isDragging && !isResizing) return;

      const rect = containerRef.current.getBoundingClientRect();

      if (isDragging) {
        // We only allow dragging if we are on the target page
        if (targetPage !== pageNum) {
          setTargetPage(pageNum);
        }

        let newX = (e.clientX - rect.left) / rect.width;
        let newY = (e.clientY - rect.top) / rect.height;

        newX = Math.max(
          0,
          Math.min(newX - signPos.width / 2, 1 - signPos.width)
        );
        newY = Math.max(
          0,
          Math.min(newY - signPos.height / 2, 1 - signPos.height)
        );

        setSignPos((prev) => ({ ...prev, x: newX, y: newY }));
      } else if (isResizing && targetPage === pageNum) {
        // Calculate new width/height based on bottom-right corner
        let newW = (e.clientX - rect.left) / rect.width - signPos.x;
        let newH = (e.clientY - rect.top) / rect.height - signPos.y;

        // Min sizes
        newW = Math.max(0.05, Math.min(newW, 1 - signPos.x));
        newH = Math.max(0.05, Math.min(newH, 1 - signPos.y));

        setSignPos((prev) => ({ ...prev, width: newW, height: newH }));
      }
    },
    [isDragging, isResizing, signPos, targetPage]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    setIsResizing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  // ---------------------------------------------------------------------------
  // Step 3 Handlers
  // ---------------------------------------------------------------------------
  const handleSaveAndSign = useCallback(async () => {
    if (!uploadedDoc || !selectedSign) return;

    const currentDims = pageDimensions[targetPage] || {
      width: A4_WIDTH,
      height: A4_HEIGHT,
    };

    try {
      await documentSign.mutateAsync({
        document_id: uploadedDoc.id,
        sign_id: selectedSign.id,
        metadata: {
          koor_x: Math.round(signPos.x * currentDims.width),
          koor_y: Math.round(
            (1 - signPos.y - signPos.height) * currentDims.height
          ),
          width: Math.round(signPos.width * currentDims.width),
          height: Math.round(signPos.height * currentDims.height),
          page: targetPage,
        },
      });
      navigate({ to: "/app" });
    } catch (err) {
      console.error("Sign failed", err);
    }
  }, [
    uploadedDoc,
    selectedSign,
    signPos,
    targetPage,
    documentSign,
    navigate,
    pageDimensions,
  ]);

  return (
    <div className="space-y-8">
      {/* Stepper UI */}
      <section>
        <p className="font-black text-[0.68rem] text-primary uppercase tracking-[0.2em]">
          Step 0{currentStep} of 03
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#eed9e0]">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between font-semibold text-[#84717a] text-[0.74rem]">
          <span className={currentStep >= 1 ? "text-primary" : ""}>Upload</span>
          <span className={currentStep >= 2 ? "text-primary" : ""}>
            Sign Placement
          </span>
          <span className={currentStep >= 3 ? "text-primary" : ""}>
            Review & Save
          </span>
        </div>
      </section>

      {/* STEP 1: UPLOAD */}
      {currentStep === 1 && (
        <div className="fade-in slide-in-from-bottom-4 animate-in">
          <section className="mb-6">
            <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
              Upload Document
            </h1>
            <p className="mt-2 text-[#705c67]">
              Choose a PDF to upload, preview, then proceed to sign.
            </p>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            {/* Left: file picker */}
            <div className="space-y-5">
              <div>
                <p className="mb-3 font-black text-[#2b1823] text-[1.4rem] tracking-[-0.02em]">
                  Select File
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleInputChange}
                />
                <Card
                  className={`rounded-2xl border-2 border-dashed bg-[#fcf3f6] py-0 ring-0 transition-colors ${
                    dragOver
                      ? "border-primary bg-primary/5"
                      : "border-[#efc4d4]"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <CardContent className="grid min-h-64 place-content-center px-5 py-8 text-center">
                    <span className="mx-auto grid size-14 place-content-center rounded-full bg-[#f8dbe6] text-primary">
                      <FileUpIcon className="size-6" />
                    </span>
                    <p className="mt-4 font-black text-[#2e1d27] text-[1.2rem] tracking-[-0.02em]">
                      Drop your PDF here
                    </p>
                    <p className="mt-1 text-[#7d6872] text-[0.84rem]">
                      Maximum file size: {MAX_SIZE_MB} MB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mx-auto mt-5 h-10 rounded-lg border-[#ecc8d6] bg-white px-6 text-primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse Files
                    </Button>
                  </CardContent>
                </Card>

                {error && (
                  <p className="mt-2 text-[0.82rem] text-red-500">{error}</p>
                )}
              </div>

              {/* Selected file info */}
              {file && (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#ebdbe0] bg-white px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-content-center rounded-lg bg-[#f8eef2] text-primary">
                      <FileUpIcon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#2b1823] text-[0.9rem]">
                        {file.name}
                      </p>
                      <p className="text-[#9d8891] text-[0.74rem]">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="shrink-0 rounded-lg p-1.5 text-[#9d8891] transition-colors hover:bg-[#f8eef2] hover:text-primary"
                  >
                    <XIcon className="size-4" />
                  </button>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  className="h-10 gap-2 rounded-lg px-6"
                  disabled={!file || documentUpload.isPending}
                  onClick={handleUpload}
                >
                  <UploadCloudIcon className="size-4" />
                  {documentUpload.isPending
                    ? "Uploading…"
                    : "Upload & Continue"}
                </Button>
              </div>

              {documentUpload.isError && (
                <p className="text-[0.84rem] text-red-500">
                  Upload failed. Please try again.
                </p>
              )}
            </div>

            {/* Right: preview */}
            <div>
              <p className="mb-3 font-black text-[#2b1823] text-[1.4rem] tracking-[-0.02em]">
                Preview
              </p>

              {previewUrl ? (
                <div className="overflow-hidden rounded-2xl border border-[#ebdbe0] bg-white">
                  <div className="flex items-center justify-between gap-2 border-[#f2e6ea] border-b px-4 py-3">
                    <p className="truncate font-semibold text-[#2b1823] text-[0.88rem]">
                      {file?.name}
                    </p>
                    <Badge className="shrink-0 bg-[#efe4e8] text-[#9f7784] text-[0.62rem] uppercase tracking-widest">
                      PDF
                    </Badge>
                  </div>
                  <iframe
                    src={previewUrl}
                    title="PDF preview"
                    className="h-130 w-full"
                  />
                </div>
              ) : (
                <Card className="rounded-2xl border border-[#ebdbe0] bg-[#faf5f7] py-0 ring-0">
                  <CardContent className="grid h-130 place-content-center px-5 text-center">
                    <span className="mx-auto grid size-14 place-content-center rounded-full bg-[#f0e4e8] text-[#c9a8b5]">
                      <FileUpIcon className="size-6" />
                    </span>
                    <p className="mt-4 font-semibold text-[#9d8891] text-[0.9rem]">
                      No file selected
                    </p>
                    <p className="mt-1 text-[#b5a0a9] text-[0.78rem]">
                      Your PDF preview will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      )}

      {/* STEP 2: SIGN PLACEMENT */}
      {currentStep === 2 && uploadedDoc && (
        <div className="fade-in slide-in-from-bottom-4 animate-in">
          <section className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
                Sign Document
              </h1>
              <p className="mt-2 text-[#705c67]">
                Select a signature and drag it onto the desired page.
              </p>
            </div>
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
          </section>

          <section className="grid gap-6 xl:grid-cols-[300px_1fr]">
            {/* Left: Specimen Selection */}
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="font-black text-[#2b1823] text-[1.2rem] tracking-[-0.02em]">
                  1. Choose Signature
                </p>
                {signSpecimenList.isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                  </div>
                ) : signSpecimenList.data?.data?.rows_data?.docs?.length ? (
                  <div className="grid gap-3">
                    {signSpecimenList.data.data.rows_data.docs.map((sign) => (
                      <button
                        key={sign.id}
                        type="button"
                        onClick={() => setSelectedSign(sign)}
                        className={`overflow-hidden rounded-xl border-2 transition-colors ${
                          selectedSign?.id === sign.id
                            ? "border-primary bg-primary/5"
                            : "border-[#ebdbe0] bg-white hover:border-[#dfc9d2]"
                        }`}
                      >
                        <img
                          src={sign.preview_url}
                          alt="Specimen"
                          className="h-20 w-full object-contain p-2"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#ebdbe0] bg-[#faf5f7] p-4 text-center">
                    <p className="text-[#9d8891] text-[0.84rem]">
                      No signatures found. Add one in your Profile.
                    </p>
                  </div>
                )}
              </div>

              {/* Target Page Selector */}
              <div className="space-y-3">
                <p className="font-black text-[#2b1823] text-[1.2rem] tracking-[-0.02em]">
                  2. Target Page
                </p>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min={1}
                    max={numPages || 1}
                    value={targetPage}
                    onChange={(e) => {
                      let val = Number.parseInt(e.target.value, 10);
                      if (Number.isNaN(val)) val = 1;
                      if (val < 1) val = 1;
                      if (val > numPages) val = numPages;
                      setTargetPage(val);
                    }}
                    className="w-20"
                  />
                  <span className="text-[#705c67] text-sm">
                    of {numPages || 1}
                  </span>
                </div>
              </div>

              <Button
                className="w-full gap-2"
                disabled={!selectedSign || !pdfUrl}
                onClick={() => setCurrentStep(3)}
              >
                Continue to Review
              </Button>
            </div>

            {/* Right: PDF Document Canvas */}
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
                  {Array.from({ length: numPages }, (_, index) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static PDF pages, never reordered
                      key={index}
                      className="relative bg-white shadow-lg"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        margin: "0 auto",
                      }}
                      ref={targetPage === index + 1 ? containerRef : null}
                      onPointerDown={() => setTargetPage(index + 1)}
                      onPointerMove={(e) => handlePointerMovePage(e, index + 1)}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                    >
                      <PdfPage
                        pageNumber={index + 1}
                        width={containerWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        onLoadSuccess={(page) => {
                          setPageDimensions((prev) => ({
                            ...prev,
                            [index + 1]: {
                              width: page.originalWidth,
                              height: page.originalHeight,
                            },
                          }));
                        }}
                      />

                      {/* Render overlay only if a signature is selected AND we're interacting with or viewing this page */}
                      {selectedSign && targetPage === index + 1 && (
                        <div
                          className="absolute border-2 border-primary bg-primary/10 shadow-sm"
                          style={{
                            left: `${signPos.x * 100}%`,
                            top: `${signPos.y * 100}%`,
                            width: `${signPos.width * 100}%`,
                            height: `${signPos.height * 100}%`,
                            cursor: isDragging ? "grabbing" : "grab",
                          }}
                          onPointerDown={handlePointerDownDrag}
                        >
                          <img
                            src={selectedSign.preview_url}
                            alt="Selected signature"
                            className="pointer-events-none h-full w-full object-fill"
                          />
                          {(isDragging || isResizing) && (
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#2b1823] px-2 py-0.5 text-[0.65rem] text-white">
                              Page {targetPage} |{" "}
                              {Math.round(
                                signPos.width *
                                  (pageDimensions[targetPage]?.width ||
                                    A4_WIDTH)
                              )}
                              x
                              {Math.round(
                                signPos.height *
                                  (pageDimensions[targetPage]?.height ||
                                    A4_HEIGHT)
                              )}
                            </div>
                          )}

                          {/* Resize Handle */}
                          <div
                            className="absolute -right-3 -bottom-3 flex size-6 cursor-nwse-resize items-center justify-center rounded-full border border-white bg-primary text-white shadow-sm"
                            onPointerDown={handlePointerDownResize}
                          >
                            <Maximize2Icon className="size-3 rotate-90" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </PdfDocument>
              )}
            </div>
          </section>
        </div>
      )}

      {/* STEP 3: REVIEW & SAVE */}
      {currentStep === 3 && uploadedDoc && selectedSign && (
        <div className="fade-in slide-in-from-bottom-4 animate-in">
          <section className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
                Review & Save
              </h1>
              <p className="mt-2 text-[#705c67]">
                Visual confirmation of your signature placement.
              </p>
            </div>
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Back
            </Button>
          </section>

          <Card className="mx-auto max-w-4xl rounded-2xl border border-[#ebdbe0] bg-white py-0 ring-0">
            <CardContent className="space-y-6 px-6 py-6">
              <div className="flex items-center gap-4 border-[#f0e6e9] border-b pb-5">
                <CheckCircle2Icon className="size-8 text-green-500" />
                <div>
                  <p className="font-black text-[#2b1823] text-[1.2rem]">
                    Ready to Sign
                  </p>
                  <p className="text-[#705c67] text-[0.84rem]">
                    Your document will be securely processed and saved.
                  </p>
                </div>
              </div>

              <div className="grid items-start gap-6 md:grid-cols-[2fr_1fr]">
                {/* Visual Preview */}
                <div className="flex justify-center rounded-xl border border-[#ebdbe0] bg-[#eef0f2] p-4">
                  {pdfUrl && (
                    <div
                      className="pointer-events-none relative shadow-md"
                      style={{ maxWidth: "300px" }}
                    >
                      <PdfDocument file={pdfUrl} onLoadError={console.error}>
                        <PdfPage
                          pageNumber={targetPage}
                          width={300}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </PdfDocument>
                      <div
                        className="absolute"
                        style={{
                          left: `${signPos.x * 100}%`,
                          top: `${signPos.y * 100}%`,
                          width: `${signPos.width * 100}%`,
                          height: `${signPos.height * 100}%`,
                        }}
                      >
                        <img
                          src={selectedSign.preview_url}
                          alt="Preview signature"
                          className="h-full w-full object-fill"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <p className="font-semibold text-[#a39098] text-[0.75rem] uppercase tracking-wider">
                      Document
                    </p>
                    <p className="truncate font-medium text-[#2b1823]">
                      {file?.name ?? uploadedDoc.id}
                    </p>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <p className="font-semibold text-[#a39098] text-[0.75rem] uppercase tracking-wider">
                      Target Page
                    </p>
                    <Badge className="w-fit bg-[#f0e6e9] text-[#2b1823] hover:bg-[#e6d0d9]">
                      Page {targetPage} of {numPages}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <p className="font-semibold text-[#a39098] text-[0.75rem] uppercase tracking-wider">
                      Geometry
                    </p>
                    <p className="font-mono text-[#5f4e56] text-[0.84rem]">
                      x:{" "}
                      {Math.round(
                        signPos.x *
                          (pageDimensions[targetPage]?.width || A4_WIDTH)
                      )}
                      , y:{" "}
                      {Math.round(
                        signPos.y *
                          (pageDimensions[targetPage]?.height || A4_HEIGHT)
                      )}
                      <br />
                      w:{" "}
                      {Math.round(
                        signPos.width *
                          (pageDimensions[targetPage]?.width || A4_WIDTH)
                      )}
                      , h:{" "}
                      {Math.round(
                        signPos.height *
                          (pageDimensions[targetPage]?.height || A4_HEIGHT)
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="w-full gap-2"
                  disabled={documentSign.isPending}
                  onClick={handleSaveAndSign}
                >
                  <PenLineIcon className="size-4" />
                  {documentSign.isPending ? "Processing..." : "Save & Sign"}
                </Button>
              </div>

              {documentSign.isError && (
                <p className="text-center text-[0.84rem] text-red-500">
                  Failed to sign document. Please try again.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute("/app/documents")({
  head: () => ({
    meta: [{ title: "Documents - Esign" }],
  }),
  validateSearch: z.object({
    docId: z.string().optional(),
  }),
  component: DocumentsPage,
});
