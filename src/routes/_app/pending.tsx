import { PenIcon } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const galleryItems = [
  {
    tag: "Default",
    date: "Created Oct 12, 2023",
    action: "Used 14 times",
    active: true,
  },
  {
    tag: "Initials",
    date: "Created Nov 04, 2023",
    action: "Set as Default",
    active: false,
  },
  {
    tag: "Formal Style",
    date: "Created Dec 20, 2023",
    action: "Set as Default",
    active: false,
  },
] as const;

const PendingPage = () => {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-black text-5xl tracking-[-0.03em] text-[#2b1823]">Signature Specimens</h1>
        <p className="mt-2 max-w-3xl text-[#705c67]">
          Manage your digital identity. Create, edit, or remove signature specimens and initials used across your legally binding documents.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <div className="space-y-4">
          <Card className="rounded-2xl border border-[#ebdbe0] bg-[#faeff3] py-0 ring-0">
            <CardHeader className="space-y-2 px-5 pt-5 pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="font-black text-[2rem] tracking-[-0.03em] text-[#2b1823]">
                  Add New Specimen
                </CardTitle>
                <div className="flex rounded-md bg-[#f3e1e8] p-1">
                  <Button size="sm" className="h-7 rounded-md bg-white px-3 text-[0.74rem] text-primary">
                    Draw
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 rounded-md px-3 text-[0.74rem]">
                    Type
                  </Button>
                </div>
              </div>
              <p className="text-[0.84rem] text-[#7b6771]">Choose your preferred method of digital signing.</p>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="grid min-h-55 place-content-center rounded-xl border border-dashed border-[#ebcad5] bg-white text-center text-[#9a7f8b]">
                <PenIcon className="mx-auto size-7 text-[#dab6c2]" />
                <p className="mt-3 text-[0.95rem] font-semibold text-[#6f5b65]">Use your mouse or stylus to sign here</p>
                <button type="button" className="mt-8 text-[0.78rem] font-semibold text-[#967e88]">Clear</button>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-[0.84rem] text-[#7a656f]">
                  <Checkbox />
                  Set as default signature
                </label>
                <Button className="h-10 rounded-lg px-6">Save Specimen</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-primary/10 bg-primary py-0 text-primary-foreground ring-0">
            <CardContent className="grid gap-5 px-5 py-6 sm:grid-cols-[1.3fr_1fr] sm:items-center">
              <div>
                <h2 className="font-black text-[1.95rem] tracking-[-0.03em]">Legal Integrity</h2>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-[#ffd8eb]">
                  Every signature created within ESIGN is cryptographically bound to your identity, meeting eIDAS and ESIGN Act standards for maximum legal enforceability.
                </p>
                <button type="button" className="mt-5 font-black text-[0.84rem] uppercase tracking-widest text-white">
                  Learn about security →
                </button>
              </div>
              <div className="mx-auto grid size-44 place-content-center rounded-full border border-white/20 bg-[#ea2a7a]">
                <div className="grid size-16 place-content-center rounded-full border border-white/35 bg-primary">
                  <span className="text-2xl">⌁</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-[2rem] tracking-[-0.03em] text-[#2b1823]">Your Gallery</h2>
            <p className="font-bold text-[0.62rem] uppercase tracking-[0.2em] text-[#8f7b84]">3 Saved</p>
          </div>

          {galleryItems.map((item) => (
            <Card
              key={item.tag}
              className={`rounded-2xl border py-0 ring-0 ${item.active ? "border-primary bg-white" : "border-[#ead9de] bg-[#faf0f3]"}`}
            >
              <CardContent className="space-y-3 px-4 py-4">
                <Badge className="rounded-md bg-[#f7d5df] px-1.5 py-0 text-[0.52rem] font-black uppercase tracking-[0.08em] text-[#8f5767]">
                  {item.tag}
                </Badge>
                <div className="grid h-24 place-content-center rounded bg-[#f2ecf0] text-[#a78d98]">
                  <div className="h-8 w-28 bg-[linear-gradient(120deg,#28282f_0%,#413f4c_45%,#2f2f37_100%)]" />
                </div>
                <div className="flex items-center justify-between text-[0.74rem]">
                  <span className="text-[#8a7580]">{item.date}</span>
                  <span className={item.active ? "text-[#5f4f56]" : "font-semibold text-primary"}>{item.action}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/_app/pending")({
  component: PendingPage,
});
