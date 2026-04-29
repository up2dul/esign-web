import { FingerprintIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EsignBrandProps = {
  className?: string;
  caption?: string;
};

export const EsignBrand = ({ className, caption }: EsignBrandProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="grid size-8 place-content-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <FingerprintIcon className="size-4" />
      </span>
      <div className="leading-none">
        <p className="font-black text-[#2b1823] text-[1.75rem] tracking-[-0.05em]">
          ESIGN
        </p>
        {caption ? (
          <p className="mt-1 font-semibold text-[#9a7e8a] text-[0.62rem] uppercase tracking-[0.28em]">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
};
