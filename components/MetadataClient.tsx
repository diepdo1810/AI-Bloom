"use client";

import { useImageStore } from "@/stores";

interface graphSettings {
    title: string;
    description: string;
}

interface metadataProps {
    title: string;
    description?: string;
    openGraph?: graphSettings;
}

interface MetadataClientProps {
    id: string;
}

export default function MetadataClient({id}: MetadataClientProps) {
    const { getImageById } = useImageStore();
    const data = getImageById(id);

    return generateMetadata({
        title: `AI Bloom: ${data?.prompt}`,
        description: `AI bloom generated from the prompt: ${data?.prompt}`,
        openGraph: {
            title: `AI Bloom: ${data?.prompt}`,
            description: `AI bloom generated from the prompt: ${data?.prompt}`,
        }
    });
}

export function generateMetadata({metadata}: metadataProps) {
    return {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
        },
    }
}