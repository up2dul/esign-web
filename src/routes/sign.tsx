import {
  CircleIcon,
  Edit3Icon,
  FilePenLineIcon,
  FileUpIcon,
  Trash2Icon,
} from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { EsignBrand } from "@/components/layout/esign-brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SignPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6e7ec] text-[#2d1b25]">
      <header className="border-b border-[#ead4dc] bg-[#faf4f7]">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <div className="flex items-center gap-5">
            <EsignBrand className="[&_p]:text-[1.2rem]" />
            <div>
              <p className="font-semibold text-[0.9rem] text-[#2f2028]">Employment_Contract_v2.pdf</p>
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#8f7b84]">Step 2 of 3: Finalize Signature</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="font-semibold text-[0.86rem] text-primary">Save & Exit</Link>
            <Button className="h-10 rounded-lg px-8">Finish</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-5 px-4 py-8 lg:grid-cols-[230px_1fr] lg:px-8 lg:py-8">
        <aside className="space-y-6">
          <div>
            <p className="font-black text-[0.68rem] uppercase tracking-[0.2em] text-[#7d6872]">Document Progress</p>
            <div className="mt-4 space-y-3 text-[0.88rem] font-semibold">
              <p className="flex items-center gap-2 text-[#2f2028]">
                <span className="grid size-6 place-content-center rounded-full bg-[#0b8d4b] text-white">✓</span>
                Review Details
              </p>
              <p className="flex items-center gap-2 text-[#2f2028]">
                <span className="grid size-6 place-content-center rounded-full border border-primary text-primary">2</span>
                Place Signature
              </p>
              <p className="flex items-center gap-2 text-[#a48d97]">
                <span className="grid size-6 place-content-center rounded-full bg-[#e9d8df]">3</span>
                Complete
              </p>
            </div>
          </div>

          <div>
            <p className="font-black text-[0.68rem] uppercase tracking-[0.2em] text-[#7d6872]">Required Fields</p>
            <Card className="mt-4 rounded-xl border border-[#ead7de] bg-[#f9f3f5] py-0 ring-0">
              <CardContent className="space-y-2 px-3 py-3">
                <div className="rounded-lg bg-white px-3 py-2">
                  <p className="font-bold text-[0.87rem]">Main Signature</p>
                  <p className="text-[0.72rem] text-[#8b767f]">Page 4 of 6</p>
                </div>
                <div className="rounded-lg bg-[#f6eef1] px-3 py-2">
                  <p className="font-bold text-[0.87rem] text-[#8c7780]">Initials</p>
                  <p className="text-[0.72rem] text-[#ae97a2]">Page 2, 3, 5</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        <section className="space-y-5">
          <Card className="rounded-none border border-[#ebd8de] bg-white py-0 shadow-[0_20px_40px_-35px_rgba(82,28,54,0.42)] ring-0">
            <CardContent className="space-y-7 px-8 py-8">
              <div className="space-y-4">
                <div className="h-4 w-40 rounded bg-[#f1e3e8]" />
                <div className="h-2.5 w-full rounded bg-[#f3e8ec]" />
                <div className="h-2.5 w-full rounded bg-[#f3e8ec]" />
                <div className="h-2.5 w-11/12 rounded bg-[#f3e8ec]" />
              </div>

              <div className="grid h-107.5 place-content-center rounded-md bg-[linear-gradient(135deg,#2b2c32_0%,#3b3c42_45%,#2f3038_100%)] text-[#9ea1b0]">
                <div className="space-y-6 text-center">
                  <span className="mx-auto block text-[10rem] leading-none">⌘</span>
                  <p className="font-black text-[1.8rem] tracking-[0.08em]">SAFE 3D DOCUMENT</p>
                </div>
              </div>

              <div className="grid gap-8 border-t border-[#f2e6eb] pt-8 md:grid-cols-2">
                <div>
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#8f7b84]">Employer Signature</p>
                  <div className="mt-3 grid h-22 place-content-center rounded-lg border border-dashed border-[#ecc9d5] bg-[#f8ecf0] text-[0.76rem] text-[#a78d98]">
                    Signed Electronically
                  </div>
                </div>
                <div>
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-primary">Candidate Signature</p>
                  <div className="relative mt-3 grid h-22 place-content-center rounded-lg border border-dashed border-primary bg-[#fef4f8] text-primary">
                    <span className="absolute top-2 right-2">
                      <CircleIcon className="size-2.5 fill-current stroke-current" />
                    </span>
                    <Button size="icon-sm" className="size-8 rounded-full">✎</Button>
                    <p className="mt-2 text-[0.78rem] font-semibold">Sign Here</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <div>
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#8f7b84]">Initials</p>
                  <div className="mt-3 grid h-11 w-24 place-content-center rounded-lg border border-[#ecd7de] bg-[#f7edf1] text-[#a58b95]">+</div>
                </div>
                <div>
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#8f7b84]">Date Signed</p>
                  <div className="mt-3 border-b border-[#ecdee4] pb-2 text-[0.92rem]">October 24, 2024</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mx-auto w-fit rounded-xl border border-[#ead7de] bg-[#f9f3f5] py-0 ring-0">
            <CardContent className="flex items-center gap-3 px-3 py-2">
              <Button variant="secondary" className="h-8 rounded-md bg-white px-3 text-[0.78rem] text-[#5f4f56]">
                <FilePenLineIcon data-icon="inline-start" />
                Type
              </Button>
              <Button variant="ghost" className="h-8 rounded-md px-3 text-[0.78rem] text-[#7b6771]">
                <Edit3Icon data-icon="inline-start" />
                Draw
              </Button>
              <Button variant="ghost" className="h-8 rounded-md px-3 text-[0.78rem] text-[#7b6771]">
                <FileUpIcon data-icon="inline-start" />
                Upload
              </Button>
              <Button variant="ghost" className="h-8 rounded-md px-3 text-[0.78rem] text-[#7b6771]">
                <Trash2Icon data-icon="inline-start" />
                Delete
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-[#e7d4dc] px-4 py-6 text-[0.66rem] uppercase tracking-[0.2em] text-[#907c85] lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
          <span>© 2024 ESign Precision Curator</span>
          <div className="flex items-center gap-6">
            <span>Security Audit</span>
            <span>Privacy Policy</span>
            <span>Certificate of Authenticity</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const Route = createFileRoute("/sign")({
  component: SignPage,
});
