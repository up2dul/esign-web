import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CircleIcon,
  Edit3Icon,
  FilePenLineIcon,
  FileUpIcon,
  Trash2Icon,
} from "lucide-react";

import { EsignBrand } from "@/components/layout/esign-brand";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SignPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6e7ec] text-[#2d1b25]">
      <header className="border-[#ead4dc] border-b bg-[#faf4f7]">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <div className="flex items-center gap-5">
            <EsignBrand className="[&_p]:text-[1.2rem]" />
            <div>
              <p className="font-semibold text-[#2f2028] text-[0.9rem]">
                Employment_Contract_v2.pdf
              </p>
              <p className="font-semibold text-[#8f7b84] text-[0.64rem] uppercase tracking-[0.14em]">
                Step 2 of 3: Finalize Signature
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/app"
              className="font-semibold text-[0.86rem] text-primary"
            >
              Save & Exit
            </Link>
            <Button className="h-10 rounded-lg px-8">Finish</Button>
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
                <span className="grid size-6 place-content-center rounded-full border border-primary text-primary">
                  2
                </span>
                Place Signature
              </p>
              <p className="flex items-center gap-2 text-[#a48d97]">
                <span className="grid size-6 place-content-center rounded-full bg-[#e9d8df]">
                  3
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
                  <p className="text-[#8b767f] text-[0.72rem]">Page 4 of 6</p>
                </div>
                <div className="rounded-lg bg-[#f6eef1] px-3 py-2">
                  <p className="font-bold text-[#8c7780] text-[0.87rem]">
                    Initials
                  </p>
                  <p className="text-[#ae97a2] text-[0.72rem]">Page 2, 3, 5</p>
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
                  <span className="mx-auto block text-[10rem] leading-none">
                    ⌘
                  </span>
                  <p className="font-black text-[1.8rem] tracking-[0.08em]">
                    SAFE 3D DOCUMENT
                  </p>
                </div>
              </div>

              <div className="grid gap-8 border-[#f2e6eb] border-t pt-8 md:grid-cols-2">
                <div>
                  <p className="font-black text-[#8f7b84] text-[0.62rem] uppercase tracking-[0.2em]">
                    Employer Signature
                  </p>
                  <div className="mt-3 grid h-22 place-content-center rounded-lg border border-[#ecc9d5] border-dashed bg-[#f8ecf0] text-[#a78d98] text-[0.76rem]">
                    Signed Electronically
                  </div>
                </div>
                <div>
                  <p className="font-black text-[0.62rem] text-primary uppercase tracking-[0.2em]">
                    Candidate Signature
                  </p>
                  <div className="relative mt-3 grid h-22 place-content-center rounded-lg border border-primary border-dashed bg-[#fef4f8] text-primary">
                    <span className="absolute top-2 right-2">
                      <CircleIcon className="size-2.5 fill-current stroke-current" />
                    </span>
                    <Button size="icon-sm" className="size-8 rounded-full">
                      ✎
                    </Button>
                    <p className="mt-2 font-semibold text-[0.78rem]">
                      Sign Here
                    </p>
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
                    Date Signed
                  </p>
                  <div className="mt-3 border-[#ecdee4] border-b pb-2 text-[0.92rem]">
                    October 24, 2024
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mx-auto w-fit rounded-xl border border-[#ead7de] bg-[#f9f3f5] py-0 ring-0">
            <CardContent className="flex items-center gap-3 px-3 py-2">
              <Button
                variant="secondary"
                className="h-8 rounded-md bg-white px-3 text-[#5f4f56] text-[0.78rem]"
              >
                <FilePenLineIcon data-icon="inline-start" />
                Type
              </Button>
              <Button
                variant="ghost"
                className="h-8 rounded-md px-3 text-[#7b6771] text-[0.78rem]"
              >
                <Edit3Icon data-icon="inline-start" />
                Draw
              </Button>
              <Button
                variant="ghost"
                className="h-8 rounded-md px-3 text-[#7b6771] text-[0.78rem]"
              >
                <FileUpIcon data-icon="inline-start" />
                Upload
              </Button>
              <Button
                variant="ghost"
                className="h-8 rounded-md px-3 text-[#7b6771] text-[0.78rem]"
              >
                <Trash2Icon data-icon="inline-start" />
                Delete
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export const Route = createFileRoute("/app/sign")({
  head: () => ({
    meta: [{ title: "Sign Document - Esign" }],
  }),
  component: SignPage,
});
