"use client";

import { useImageStore } from "@/stores";
import FormRSC from "./form-rsc";

interface ResultsClientProps {
  id: string;
}

export default function ResultsClient({ id }: ResultsClientProps) {
  const { getImageById } = useImageStore();
  const data = getImageById(id);

  return (
    <FormRSC
      prompt={data?.prompt}
      image={data?.image as string}
      pattern={data?.pattern}
    />
  );
}
