import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronRightIcon,
  EraserIcon,
  LockKeyholeIcon,
  PenLineIcon,
  PlusIcon,
  ShieldIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserInitials } from "@/lib/utils";
import { useSignSpecimenList, useSignUpload } from "@/services/queries/sign";
import { useUserProfile } from "@/services/queries/user";

const SignatureCanvas = ({
  onSave,
  isSaving,
}: {
  onSave: (blob: Blob) => Promise<void>;
  isSaving: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#2b1823";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if ("touches" in e) {
        const touch = e.touches[0];
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      isDrawing.current = true;
      const pos = getPos(e, canvas);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      e.preventDefault();
    },
    [getPos]
  );

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const pos = getPos(e, canvas);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      setIsEmpty(false);
      e.preventDefault();
    },
    [getPos]
  );

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  }, []);

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (blob) await onSave(blob);
    }, "image/png");
  }, [onSave]);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border-2 border-[#e0cdd4] border-dashed bg-white">
        <canvas
          ref={canvasRef}
          width={600}
          height={240}
          className="w-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <p className="text-center text-[#9d8891] text-[0.75rem]">
        Draw your signature above using mouse or touch
      </p>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-9 gap-1.5 rounded-lg border-[#ecd6dd] bg-[#f8eef2] px-4"
          onClick={clear}
          disabled={isSaving}
        >
          <EraserIcon className="size-3.5" />
          Clear
        </Button>
        <Button
          type="button"
          className="h-9 rounded-lg px-4"
          onClick={handleSave}
          disabled={isEmpty || isSaving}
        >
          {isSaving ? "Saving…" : "Save Signature"}
        </Button>
      </div>
    </div>
  );
};

const SpecimenCard = ({ previewUrl }: { previewUrl: string }) => (
  <div className="overflow-hidden rounded-xl border border-[#ebdbe0] bg-white">
    <img
      src={previewUrl}
      alt="Signature specimen"
      className="h-24 w-full object-contain p-3"
    />
  </div>
);

const ProfilePage = () => {
  const userProfile = useUserProfile();
  const user = userProfile.data?.data;

  const signSpecimenList = useSignSpecimenList();
  const signUpload = useSignUpload();

  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback(
    (val: boolean) => {
      setOpen(val);
      if (!val) signUpload.reset();
    },
    [signUpload]
  );

  const handleSaveSignature = useCallback(
    async (blob: Blob) => {
      const formData = new FormData();
      formData.append("files", blob, "signature.png");
      await signUpload.mutateAsync(formData);
      setOpen(false);
    },
    [signUpload]
  );

  return (
    <div className="space-y-7">
      <section>
        <h1 className="font-black text-5xl text-[#2b1823] tracking-[-0.03em]">
          Account Settings
        </h1>
        <p className="mt-2 text-[#705c67]">
          Manage your personal presence and secure your workspace.
        </p>
      </section>

      {/* Profile Info */}
      <section className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
        <Card className="rounded-2xl border border-[#ebdbe0] bg-white py-0 ring-0">
          <CardContent className="px-6 py-6">
            <div className="flex flex-wrap items-start gap-4">
              {userProfile.isLoading ? (
                <Skeleton className="size-20 rounded-full" />
              ) : (
                <Avatar size="lg" className="size-20 border-2 border-[#f0dce3]">
                  {user?.profile_picture ? (
                    <AvatarImage src={user.profile_picture} alt={user.name} />
                  ) : null}
                  <AvatarFallback>
                    {user ? getUserInitials(user.name) : "—"}
                  </AvatarFallback>
                  <AvatarBadge className="size-5 bg-primary" />
                </Avatar>
              )}

              <div className="space-y-2">
                {userProfile.isLoading ? (
                  <>
                    <Skeleton className="h-9 w-48 rounded-lg" />
                    <Skeleton className="h-4 w-56 rounded" />
                  </>
                ) : (
                  <>
                    <h2 className="font-black text-[#2b1823] text-[2rem] tracking-[-0.03em]">
                      {user?.name ?? "—"}
                    </h2>
                    {user?.is_verified ? (
                      <Badge className="bg-green-500">Verified</Badge>
                    ) : (
                      <Badge className="bg-red-500">Not Verified</Badge>
                    )}
                    <div className="text-[#3f2b35] text-[0.9rem]">
                      <p className="font-semibold text-[#9d8891] text-[0.62rem] uppercase tracking-[0.14em]">
                        Email Address
                      </p>
                      <p>{user?.email ?? "—"}</p>
                    </div>
                    <div className="text-[#3f2b35] text-[0.9rem]">
                      <p className="font-semibold text-[#9d8891] text-[0.62rem] uppercase tracking-[0.14em]">
                        Identity Number
                      </p>
                      <p>{user?.card_no ?? "—"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button className="h-9 rounded-lg px-4">
                Update Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Signature Specimen */}
      <section className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
        <Card className="rounded-2xl border border-[#ebdbe0] bg-white py-0 ring-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 font-black text-[#2b1823] text-[1.6rem] tracking-[-0.02em]">
                <PenLineIcon className="size-4 text-primary" />
                Signature Specimen
              </CardTitle>
              <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger
                  render={
                    <Button className="h-9 gap-1.5 rounded-lg px-4 text-[0.84rem]">
                      <PlusIcon className="size-3.5" />
                      Draw Signature
                    </Button>
                  }
                />
                <DialogContent className="max-w-2xl rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-black text-[#2b1823] text-[1.4rem] tracking-[-0.02em]">
                      Draw Your Signature
                    </DialogTitle>
                  </DialogHeader>
                  <SignatureCanvas
                    onSave={handleSaveSignature}
                    isSaving={signUpload.isPending}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            {signSpecimenList.isLoading ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <Skeleton key={n} className="h-24 rounded-xl" />
                ))}
              </div>
            ) : !signSpecimenList.data?.data.rows_data.docs.length ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#f8eef2]">
                  <PenLineIcon className="size-6 text-primary/60" />
                </div>
                <p className="font-semibold text-[#7a6570] text-[0.9rem]">
                  No signature specimen yet
                </p>
                <p className="text-[#9d8891] text-[0.8rem]">
                  Draw and save your signature to use when signing documents.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {signSpecimenList.data.data.rows_data.docs.map((sign) => (
                  <SpecimenCard key={sign.id} previewUrl={sign.preview_url} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Account Security */}
      <section className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
        <Card className="rounded-2xl border border-[#ebdbe0] bg-white py-0 ring-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle className="flex items-center gap-2 font-black text-[#2b1823] text-[1.6rem] tracking-[-0.02em]">
              <ShieldIcon className="size-4 text-primary" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl bg-[#f8f1f4] p-4 text-left hover:bg-[#f5eaef]"
              >
                <div className="flex items-center gap-3">
                  <LockKeyholeIcon className="size-4 text-[#886f79]" />
                  <div>
                    <p className="font-bold text-[#2f2028] text-[0.95rem]">
                      Change Password
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="size-4 text-[#8f7b84]" />
              </button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});
