import {
  ChevronRightIcon,
  KeyRoundIcon,
  LockKeyholeIcon,
  PlusCircleIcon,
  ShieldIcon,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activityFeed = [
  {
    title: "New Login: Chrome on MacOS",
    detail: "San Francisco, CA • Today, 10:24 AM",
    tone: "bg-[#00844b]",
  },
  {
    title: 'Document Signed: "NDA_V2.pdf"',
    detail: "Yesterday, 4:45 PM",
    tone: "bg-[#b33a6f]",
  },
  {
    title: "Profile Photo Updated",
    detail: "Oct 05, 2024",
    tone: "bg-[#d7a8b7]",
  },
] as const;

const ProfilePage = () => {
  return (
    <div className="space-y-7">
      <section>
        <h1 className="font-black text-5xl tracking-[-0.03em] text-[#2b1823]">Account Settings</h1>
        <p className="mt-2 text-[#705c67]">
          Manage your personal presence and secure your workspace.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
        <Card className="rounded-2xl border border-[#ebdbe0] bg-white py-0 ring-0">
          <CardContent className="px-6 py-6">
            <div className="flex flex-wrap items-start gap-4">
              <Avatar size="lg" className="size-20 border-2 border-[#f0dce3]">
                <AvatarImage src="https://i.pravatar.cc/180?img=5" alt="Julianne Sterling" />
                <AvatarFallback>JS</AvatarFallback>
                <AvatarBadge className="size-5 bg-primary" />
              </Avatar>

              <div className="space-y-2">
                <h2 className="font-black text-[2rem] tracking-[-0.03em] text-[#2b1823]">
                  Julianne Sterling
                </h2>
                <p className="font-bold text-[0.77rem] uppercase tracking-[0.16em] text-primary">
                  Senior Legal Curator
                </p>
                <div className="grid gap-2 text-[0.9rem] text-[#3f2b35] sm:grid-cols-2">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#9d8891]">
                      Email Address
                    </p>
                    <p>j.sterling@curator.esign.com</p>
                  </div>
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#9d8891]">
                      Mobile
                    </p>
                    <p>+1 (555) 012-9842</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button className="h-9 rounded-lg px-4">Update Information</Button>
              <Button variant="outline" className="h-9 rounded-lg border-[#ecd6dd] bg-[#f8eef2] px-4">
                Download Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-[#ebdbe0] bg-[#faeff3] py-0 ring-0">
          <CardHeader className="space-y-3 px-5 pt-5 pb-3">
            <Badge className="w-fit rounded-full bg-[#f77999] px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-white">
              Active Plan
            </Badge>
            <CardTitle className="font-black text-[2rem] tracking-[-0.03em] text-[#2b1823]">Premium Plan</CardTitle>
            <p className="text-[0.9rem] leading-relaxed text-[#7a656f]">
              Unlimited documents, priority support, and multi-signature workflows.
            </p>
          </CardHeader>
          <CardContent className="space-y-3 px-5 pb-5 text-[0.9rem] text-[#4f3e47]">
            <div className="flex justify-between">
              <span className="text-[#826f78]">Next billing:</span>
              <span className="font-semibold">Oct 12, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#826f78]">Price:</span>
              <span className="font-black text-primary">$29.00 / mo</span>
            </div>
            <Button variant="outline" className="mt-3 h-10 w-full rounded-lg border-[#eccad6] bg-white font-semibold text-primary">
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-2xl border border-[#ebdbe0] bg-white py-0 ring-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle className="flex items-center gap-2 font-black text-[1.6rem] tracking-[-0.02em] text-[#2b1823]">
              <ShieldIcon className="size-4 text-primary" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-3">
              <button type="button" className="flex w-full items-center justify-between rounded-xl bg-[#f8f1f4] p-4 text-left hover:bg-[#f5eaef]">
                <div className="flex items-center gap-3">
                  <LockKeyholeIcon className="size-4 text-[#886f79]" />
                  <div>
                    <p className="font-bold text-[0.95rem] text-[#2f2028]">Change Password</p>
                    <p className="text-[0.74rem] text-[#8d7881]">Last updated 4 months ago</p>
                  </div>
                </div>
                <ChevronRightIcon className="size-4 text-[#8f7b84]" />
              </button>

              <button type="button" className="flex w-full items-center justify-between rounded-xl bg-[#f8f1f4] p-4 text-left hover:bg-[#f5eaef]">
                <div className="flex items-center gap-3">
                  <ShieldIcon className="size-4 text-[#886f79]" />
                  <div>
                    <p className="font-bold text-[0.95rem] text-[#2f2028]">Two-Factor Authentication</p>
                    <p className="text-[0.74rem] font-semibold text-[#18814d]">Enabled & Secured</p>
                  </div>
                </div>
                <ChevronRightIcon className="size-4 text-[#8f7b84]" />
              </button>

              <button type="button" className="flex w-full items-center justify-between rounded-xl bg-[#f8f1f4] p-4 text-left hover:bg-[#f5eaef]">
                <div className="flex items-center gap-3">
                  <KeyRoundIcon className="size-4 text-[#886f79]" />
                  <div>
                    <p className="font-bold text-[0.95rem] text-[#2f2028]">Hardware Security Keys</p>
                    <p className="text-[0.74rem] text-[#8d7881]">0 keys registered</p>
                  </div>
                </div>
                <PlusCircleIcon className="size-4 text-[#8f7b84]" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-[#ebdbe0] bg-[#faeff3] py-0 ring-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle className="font-black text-[1.8rem] tracking-[-0.02em] text-[#2b1823]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-5 pb-5">
            {activityFeed.map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className={`mt-2 size-1.5 shrink-0 rounded-full ${item.tone}`} />
                <div>
                  <p className="font-bold text-[0.92rem] text-[#34232c]">{item.title}</p>
                  <p className="text-[0.74rem] text-[#816d76]">{item.detail}</p>
                </div>
              </div>
            ))}
            <button type="button" className="pt-5 font-black text-[0.82rem] uppercase tracking-[0.15em] text-primary">
              View All Logs
            </button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});
