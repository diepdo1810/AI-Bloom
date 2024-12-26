"use client";

import { generate } from "@/lib/actions";
import useEnterSubmit from "@/lib/hooks/use-enter-submit";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormStatus  } from "react-dom";
import { LoadingCircle } from "./icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import va from "@vercel/analytics";
// @ts-ignore
import promptmaker from "promptmaker";
import Popover from "./popover";
import { DEFAULT_PATTERN } from "@/lib/constants";
import PatternPicker from "./pattern-picker";
import { useImageStore } from "@/stores";

export default function Form({
  promptValue,
  patternValue,
}: {
  promptValue?: string;
  patternValue?: string;
}) {
  const router = useRouter();
  const [prompt, setPrompt] = useState(promptValue || "");
  const [placeholderPrompt, setPlaceholderPrompt] = useState("");
  useEffect(() => {
    if (promptValue) {
      setPlaceholderPrompt("");
    } else {
      setPlaceholderPrompt(promptmaker());
    }
  }, [promptValue]);

  const { formRef, onKeyDown } = useEnterSubmit();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (promptValue && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [promptValue]);

  const [pattern, setPattern] = useState(patternValue || DEFAULT_PATTERN);
  const [openPopover, setOpenPopover] = useState(false);

  const { create } = useImageStore();

  const handlePatten = (pattern: string) => {
    return pattern === "spiral"
  }

  return (
    <form
      ref={formRef}
      className="mx-auto mt-6 flex w-full max-w-xl animate-fade-up items-center space-x-2 rounded-lg border border-gray-200 bg-white px-1 py-2 opacity-0 shadow-md sm:px-2 sm:py-4"
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      action={() => {
        va.track("generate prompt", {
          prompt: prompt,
        });
        generate().then((id) => {
          create({
            id,
            prompt: prompt,
            image: null,
            pattern: pattern,
            generating: false,
          });
          router.push(`/t/${id}`);
        });
      }}
    >
      <input className="hidden" name="pattern" value={pattern} readOnly />

      <textarea
        id="prompt"
        name="prompt"
        ref={textareaRef}
        value={prompt}
        autoFocus
        autoComplete="off"
        placeholder={placeholderPrompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab" && e.currentTarget.value === "") {
            setPrompt(placeholderPrompt);
            e.preventDefault();
          }
          onKeyDown(e);
        }}
        className="flex-1 resize-none outline-none"
      />
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "group rounded-lg p-2.5",
        pending
          ? "cursor-disabled bg-gray-100"
          : "transition-all hover:bg-gray-100 active:bg-gray-200",
      )}
      disabled={pending}
    >
      {pending ? (
        <LoadingCircle />
      ) : (
        <SendHorizonal className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
      )}
    </button>
  );
};
