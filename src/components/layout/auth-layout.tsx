import type { PropsWithChildren } from "react";

import { EsignBrand } from "@/components/layout/esign-brand";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "./footer";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-[#2d1b25]">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 lg:px-8 lg:py-10">
        <header>
          <EsignBrand className="[&_p]:text-[1.35rem]" />
        </header>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1.55fr_1fr]">
          <div>
            <h1 className="max-w-xl font-black text-[#2b1823] text-[4.4rem] leading-[0.95] tracking-[-0.05em] sm:text-[5.4rem]">
              Precision{" "}
              <span className="font-serif text-primary italic">Curator</span> of
              Trust.
            </h1>
            <p className="mt-6 max-w-xl text-[#67535d] text-[1.25rem] leading-relaxed">
              The ultimate space for secure digital transactions. Manage, sign,
              and store your most vital documents with unparalleled authority.
            </p>

            <Card className="mt-9 rounded-2xl border border-[#ecdbe1] bg-[#f8edf1] py-0 ring-0">
              <CardContent className="relative px-3 py-3 sm:px-4 sm:py-4">
                <div className="h-82.5 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#bfbec2_0%,#d7d5d7_40%,#aaaaaf_100%)]">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_22%_30%,rgba(255,255,255,0.75),transparent_40%),linear-gradient(140deg,rgba(255,255,255,0.6)_0%,transparent_48%),linear-gradient(0deg,rgba(255,255,255,0.4)_0%,transparent_38%)]" />
                </div>

                <div className="absolute bottom-8 left-8 rounded-xl border border-[#ebdce1] bg-white px-4 py-3 shadow-sm">
                  <p className="font-black text-[0.68rem] text-primary uppercase tracking-[0.2em]">
                    Encrypted Security
                  </p>
                  <p className="mt-1 text-[#5f4f57] text-[0.84rem]">
                    AES-256 Bit Encryption Protocol
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:pt-10">{children}</div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
