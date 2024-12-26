"use client";

import { Copy, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingCircle } from "@/components/icons";
import { useParams, useRouter } from "next/navigation";
import va from "@vercel/analytics";
import { usePollinationsImage } from "@pollinations/react";
import {toast} from "sonner";

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

interface PhotoBoothProps {
  image?: string;
  prompt?: string;
  pattern?: string;
}

export default function PhotoBooth({
  image,
  prompt,
  pattern,
}: PhotoBoothProps) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pollinationsImage = usePollinationsImage(prompt || "", {
    width: 1280,
    height: 1280,
    seed: 42,
    model: pattern || "midjourney",
    nologo: true,
    enhance: false,
  });

  const finalImage = image || pollinationsImage;

  const urlImage = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt || '')}`;

  useEffect(() => {
    if (finalImage) {
      setIsLoading(false);
    }
  }, [finalImage]);

  useEffect(() => {
    let interval: number;

    if (!finalImage) {
      interval = setInterval(() => {
        router.refresh();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [finalImage, router]);

  return (
    <div
      className="group relative mx-auto mt-6 aspect-square w-full max-w-xl animate-fade-up overflow-hidden rounded-2xl border border-gray-200 opacity-0"
      style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
    >
      {id && finalImage && !isLoading && (
        <div className="absolute right-5 top-5 z-10 flex space-x-2">
          <button
            onClick={() => {
              setCopying(true);
              va.track("copy image", {
                finalImage,
                page: `https://spirals.vercel.app/t/${id}`,
              });
              fetch(urlImage, {
                headers: new Headers({
                  Origin: location.origin,
                }),
                mode: "cors",
              })
                .then((response) => {
                  const url = response.url;
                  navigator.clipboard.writeText(url);
                  toast("Image URL copied to clipboard");
                  setCopying(false);
                })
                .catch((e) => console.error(e));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {copying ? (
              <LoadingCircle />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <button
            onClick={() => {
              setDownloading(true);
              va.track("download image", {
                finalImage,
                page: `https://spirals.vercel.app/t/${id}`,
              });
              fetch(urlImage, {
                headers: new Headers({
                  Origin: location.origin,
                }),
                mode: "cors",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  let blobUrl = window.URL.createObjectURL(blob);
                  forceDownload(blobUrl, `${id || "demo"}.png`);
                  setDownloading(false);
                })
                .catch((e) => console.error(e));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {downloading ? (
              <LoadingCircle />
            ) : (
              <Download className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="z-10 flex h-full w-full flex-col items-center bg-white pt-[140px] sm:pt-[280px]">
          <LoadingCircle />
          {id && (
            <div
              className="my-4 flex animate-fade-up flex-col items-center space-y-4 opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <p className="text-sm text-gray-500">
                Generating your image... This can take 20-30 seconds.
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <Image
            alt="output image"
            src={finalImage}
            width={1280}
            height={1280}
            className="h-full object-cover"
            unoptimized
          />
        </>
      )}
    </div>
  );
}
