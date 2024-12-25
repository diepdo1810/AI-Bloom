import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
import FormRSC from "@/components/form-rsc";
import { Metadata } from "next";
import ResultsClient from "@/components/ResultsClient";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | undefined> {
  try {
    const data = await kv.hgetall<{ prompt: string; image?: string }>(
      params.id,
    );

    const title = `Spirals: ${data?.prompt}`;
    const description = `A spiral generated from the prompt: ${data?.prompt}`;
    if (!data) {
      return;
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@steventey",
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default async function Results({
  params,
}: {
  params: {
    id: string;
  };
}) {
  try {
    const data = await kv.hgetall<{ prompt: string; image?: string }>(
      params.id,
    );

    if (!data) {
      notFound();
    }
    return <FormRSC prompt={data.prompt} image={data.image || null} />;
  } catch (error) {
    console.error(error);

    return <ResultsClient id={params.id} />;
  }
}
