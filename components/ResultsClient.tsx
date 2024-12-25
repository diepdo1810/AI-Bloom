"use client";

import { useEffect, useState } from "react";
import { useImageStore } from "@/stores";
import FormRSC from "./form-rsc";

interface ResultsClientProps {
  id: string;
}

export default function ResultsClient({ id }: ResultsClientProps) {
  const { getImageById } = useImageStore();
  const data = getImageById(id);
  console.log(data);
  return (
    <FormRSC
      prompt={data?.prompt}
      image={data?.image || null}
      pattern={data?.pattern}
    />
  );
}
