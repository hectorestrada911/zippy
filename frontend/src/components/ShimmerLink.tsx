"use client";

import { useRouter } from "next/navigation";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface ShimmerLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  background?: string;
}

/** Client-only link that renders as ShimmerButton and navigates on click. */
export function ShimmerLink({
  href,
  children,
  className,
  shimmerColor,
  background,
}: ShimmerLinkProps) {
  const router = useRouter();
  return (
    <ShimmerButton
      type="button"
      onClick={() => router.push(href)}
      className={className}
      shimmerColor={shimmerColor}
      background={background}
    >
      {children}
    </ShimmerButton>
  );
}
