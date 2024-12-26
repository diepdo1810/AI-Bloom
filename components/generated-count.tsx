"use client";

import { nFormatter } from "@/lib/utils";

export function GeneratedCount({ count }: { count?: number }) {
  return <CountDisplay count={count} />;
}

export const CountDisplay = ({ count }: { count?: number }) => {
  return (
    <p
      className="mt-4 animate-fade-up text-center text-sm text-gray-500 opacity-0"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      {count ? nFormatter(count) : "..."} photos generated and counting!
    </p>
  );
};
