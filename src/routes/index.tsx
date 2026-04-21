import { MailIcon, LockIcon, ShieldCheckIcon } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { EsignBrand } from "@/components/layout/esign-brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-[#2d1b25]">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 lg:px-8 lg:py-10">
        <header>
          <EsignBrand className="[&_p]:text-[1.35rem]" />
        </header>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1.55fr_1fr]">
          <div>
            <h1 className="max-w-xl font-black text-[4.4rem] leading-[0.95] tracking-[-0.05em] text-[#2b1823] sm:text-[5.4rem]">
              Precision <span className="font-serif text-primary italic">Curator</span> of Trust.
            </h1>
            <p className="mt-6 max-w-xl text-[1.25rem] leading-relaxed text-[#67535d]">
              The ultimate space for secure digital transactions. Manage, sign,
              and store your most vital documents with unparalleled authority.
            </p>

            <Card className="mt-9 rounded-2xl border border-[#ecdbe1] bg-[#f8edf1] py-0 ring-0">
              <CardContent className="relative px-3 py-3 sm:px-4 sm:py-4">
                <div className="h-82.5 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#bfbec2_0%,#d7d5d7_40%,#aaaaaf_100%)]">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_22%_30%,rgba(255,255,255,0.75),transparent_40%),linear-gradient(140deg,rgba(255,255,255,0.6)_0%,transparent_48%),linear-gradient(0deg,rgba(255,255,255,0.4)_0%,transparent_38%)]" />
                </div>

                <div className="absolute bottom-8 left-8 rounded-xl border border-[#ebdce1] bg-white px-4 py-3 shadow-sm">
                  <p className="font-black text-[0.68rem] uppercase tracking-[0.2em] text-primary">
                    Encrypted Security
                  </p>
                  <p className="mt-1 text-[0.84rem] text-[#5f4f57]">
                    AES-256 Bit Encryption Protocol
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:pt-10">
            <Card className="rounded-2xl border border-[#ebdce2] bg-[#faf4f7] py-0 ring-0">
              <CardHeader className="space-y-2 px-5 pt-6 pb-3 sm:px-8">
                <CardTitle className="font-black text-[3rem] tracking-[-0.05em] text-[#2b1823]">
                  Sign In
                </CardTitle>
                <p className="text-[#73606a]">Access your signature vault</p>
              </CardHeader>

              <CardContent className="space-y-4 px-5 pb-6 sm:px-8">
                <div>
                  <p className="mb-1.5 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#8f7a83]">
                    Email Address
                  </p>
                  <div className="relative">
                    <Input
                      placeholder="curator@esign.com"
                      className="h-11 rounded-lg border-[#ebd5dd] bg-white pr-10"
                    />
                    <MailIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#bea4ad]" />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#8f7a83]">
                      Password
                    </p>
                    <button type="button" className="font-bold text-[0.68rem] uppercase tracking-[0.14em] text-primary">
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      type="password"
                      value="password"
                      readOnly
                      className="h-11 rounded-lg border-[#ebd5dd] bg-white pr-10"
                    />
                    <LockIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#bea4ad]" />
                  </div>
                </div>

                <Link to="/dashboard" className="block pt-2">
                  <Button className="h-11 w-full rounded-lg text-[0.95rem]">Sign In →</Button>
                </Link>

                <p className="pt-2 text-center text-[0.86rem] text-[#77636d]">
                  New to the platform?{" "}
                  <button type="button" className="font-semibold text-primary">
                    Create Account
                  </button>
                </p>

                <div className="pt-5 text-center text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#a8949d]">
                  <p className="inline-flex items-center gap-2">
                    <ShieldCheckIcon className="size-3.5" />
                    Secure Cloud
                    <span>•</span>
                    Legally Binding
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#eadbe0] px-4 py-6 text-[0.68rem] uppercase tracking-[0.2em] text-[#8e7b84] lg:px-8">
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

export const Route = createFileRoute("/")({
  component: LoginPage,
});
