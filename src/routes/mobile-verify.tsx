import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheckIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const MobileVerifyPage = () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user_id");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbf7f9] px-4">
      <Card className="w-full max-w-md rounded-2xl border border-[#ebdbe0] bg-white">
        <CardContent className="flex flex-col items-center gap-4 px-6 py-8 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#f8eef2]">
            <ShieldCheckIcon className="size-8 text-primary" />
          </div>

          <div>
            <h1 className="font-black text-[#2b1823] text-[1.8rem] tracking-[-0.03em]">
              Mobile Verification
            </h1>
            <p className="mt-2 text-[#705c67] text-sm">
              QR berhasil dibuka. Gunakan User ID ini untuk melanjutkan proses
              verifikasi dari mobile.
            </p>
          </div>

          <div className="w-full rounded-xl bg-[#f8f1f4] p-4 text-left">
            <p className="font-semibold text-[#9d8891] text-[0.7rem] uppercase tracking-[0.14em]">
              User ID
            </p>
            <p className="mt-1 break-all font-medium text-[#2f2028] text-sm">
              {userId ?? "-"}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export const Route = createFileRoute("/mobile-verify")({
  component: MobileVerifyPage,
});
