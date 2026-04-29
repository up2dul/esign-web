import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  CirclePlusIcon,
  FileUpIcon,
  LightbulbIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

import { EsignBrand } from "@/components/layout/esign-brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const topNavItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Documents", to: "/documents" },
  { label: "Profile", to: "/profile" },
] as const;

const DocumentsSetupPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-[#2d1b25]">
      <header className="border-[#e9d7dd] border-b bg-[#f9f4f6]/95 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <Link to="/dashboard" className="shrink-0">
            <EsignBrand className="[&_p]:text-[1.2rem]" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {topNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "border-transparent border-b-2 px-0.5 pb-1 font-semibold text-[#68545f] text-[0.92rem] transition-colors",
                  item.to === "/documents" && "border-primary text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden font-semibold text-[#806b75] text-[0.84rem] sm:inline-flex"
            >
              Sign Out
            </Link>
            <Button className="h-10 rounded-lg px-6">Upload</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-9 lg:px-8 lg:py-10">
        <section>
          <p className="font-black text-[0.68rem] text-primary uppercase tracking-[0.2em]">
            Step 01 of 03
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#eed9e0]">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
          <p className="mt-2 text-right font-semibold text-[#84717a] text-[0.74rem]">
            Upload & Setup
          </p>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.75fr_1fr]">
          <div className="space-y-8">
            <div>
              <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
                Select Document
              </h1>
              <p className="mt-2 text-[#715d67]">
                Choose the file you wish to secure and sign.
              </p>

              <Card className="mt-5 rounded-2xl border border-[#efc4d4] border-dashed bg-[#fcf3f6] py-0 ring-0">
                <CardContent className="grid min-h-62.5 place-content-center px-5 py-7 text-center">
                  <span className="mx-auto grid size-14 place-content-center rounded-full bg-[#f8dbe6] text-primary">
                    <FileUpIcon className="size-6" />
                  </span>
                  <p className="mt-4 font-black text-[#2e1d27] text-[1.35rem] tracking-[-0.02em]">
                    Drop your PDF or Docx here
                  </p>
                  <p className="mt-1 text-[#7d6872] text-[0.84rem]">
                    Maximum file size: 25MB
                  </p>
                  <Button
                    variant="outline"
                    className="mx-auto mt-5 h-10 rounded-lg border-[#ecc8d6] bg-white px-6 text-primary"
                  >
                    Browse Files
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-black text-[#2b1823] text-[2.1rem] tracking-[-0.03em]">
                    Add Recipients
                  </h2>
                  <p className="text-[#715d67]">
                    Specify who needs to view or sign this document.
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 font-semibold text-[0.82rem] text-primary"
                >
                  <CirclePlusIcon className="size-4" />
                  Add Row
                </button>
              </div>

              <Card className="rounded-2xl border border-[#ebdbe0] bg-white py-0 ring-0">
                <CardContent className="grid gap-3 px-4 py-4 sm:grid-cols-[auto_1fr_1fr_auto] sm:items-end">
                  <span className="grid size-8 place-content-center rounded-full bg-[#f7d8e3] font-bold text-[0.8rem] text-primary">
                    1
                  </span>
                  <div>
                    <p className="mb-1 font-semibold text-[#9c8790] text-[0.62rem] uppercase tracking-[0.14em]">
                      Full Name
                    </p>
                    <Input
                      className="h-10 rounded-lg border-[#ebd7de] bg-[#fcf7f9]"
                      placeholder="e.g. Alexander Vance"
                    />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-[#9c8790] text-[0.62rem] uppercase tracking-[0.14em]">
                      Email Address
                    </p>
                    <Input
                      className="h-10 rounded-lg border-[#ebd7de] bg-[#fcf7f9]"
                      placeholder="alex@vault.co"
                    />
                  </div>
                  <div className="mb-2 flex items-center gap-2 text-[#8c7780]">
                    <PencilIcon className="size-4" />
                    <Trash2Icon className="size-4" />
                  </div>
                </CardContent>
              </Card>

              <button
                type="button"
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#eec8d6] border-dashed bg-[#fcf2f6] font-semibold text-[#715d67] text-[0.95rem]"
              >
                <CirclePlusIcon className="size-4" />
                Add another recipient
              </button>
            </div>

            <Card className="rounded-2xl border border-[#ecd8df] bg-[#faedf2] py-0 ring-0">
              <CardContent className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-content-center rounded-lg bg-white text-primary">
                    <PencilIcon className="size-4" />
                  </span>
                  <div>
                    <p className="font-bold text-[#2f2028] text-[0.95rem]">
                      Set Signing Order
                    </p>
                    <p className="text-[#836f78] text-[0.8rem]">
                      Document will be sent to recipients sequentially.
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </CardContent>
            </Card>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 font-semibold text-[#5a4a52] transition-colors hover:text-primary"
              >
                <ArrowLeftIcon className="size-4" />
                Back to Dashboard
              </Link>
              <Link to="/sign">
                <Button className="h-11 rounded-lg px-8">
                  Prepare Signature Fields
                </Button>
              </Link>
            </div>
          </div>

          <aside className="space-y-4 xl:pt-16">
            <Card className="rounded-2xl border border-[#ebdbe0] bg-[#faeff3] py-0 ring-0">
              <CardHeader className="space-y-2 px-4 pt-4 pb-1">
                <CardTitle className="flex items-center gap-2 font-black text-[#2b1823] text-[1.25rem] tracking-[-0.02em]">
                  <LightbulbIcon className="size-4 text-primary" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4 text-[#705c67] text-[0.84rem] leading-relaxed">
                <div>
                  <p className="font-bold text-[#2f2028]">Sequential Signing</p>
                  <p>
                    Turn on "Signing Order" if specific stakeholders need to
                    approve before others.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[#2f2028]">Accessibility</p>
                  <p>
                    Ensure your PDF has a clear title and metadata for
                    screen-reader users.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-[#ebdbe0] bg-[linear-gradient(140deg,#a6a8af_0%,#c2c5cb_35%,#9ca0a8_100%)] py-0 ring-0">
              <CardContent className="space-y-4 px-4 py-4 text-white">
                <div className="grid h-28 place-content-center rounded-lg bg-white/20">
                  <FileUpIcon className="size-12" />
                </div>
                <p className="font-black text-[#ffd3e3] text-[0.7rem] uppercase tracking-[0.15em]">
                  Security Vault
                </p>
                <h3 className="font-black text-[1.55rem] tracking-[-0.03em]">
                  256-bit AES Encryption
                </h3>
                <p className="text-[#f5ddeb] text-[0.83rem]">
                  Every document uploaded to ESIGN is fragmented and encrypted
                  at rest.
                </p>
              </CardContent>
            </Card>
          </aside>
        </section>
      </main>

      <footer className="border-[#eadbe0] border-t px-4 py-6 text-[#8e7b84] text-[0.68rem] uppercase tracking-[0.2em] lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
          <span>© 2024 ESign Precision Curator</span>
          <div className="flex items-center gap-7">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const Route = createFileRoute("/documents")({
  component: DocumentsSetupPage,
});
