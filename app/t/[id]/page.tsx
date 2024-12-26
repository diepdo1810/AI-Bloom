import ResultsClient from "@/components/ResultsClient";
import MetadataClient from "@/components/MetadataClient";

interface Params {
    id: string;
}

export async function generateMetadata({ params }: { params: Params }) {
    return <MetadataClient id={params.id} />;
}

export default async function Results({ params }: { params: Params }) {
    return <ResultsClient id={params.id} />;
}
