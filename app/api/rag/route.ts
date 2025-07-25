
import { NextResponse } from "next/server";

import { RAGApplicationBuilder, SIMPLE_MODELS } from '@llm-tools/embedjs';
import { OpenAiEmbeddings } from '@llm-tools/embedjs-openai';
import { WebLoader } from '@llm-tools/embedjs-loader-web';
import { QdrantDb } from '@llm-tools/embedjs-qdrant';
import { PdfLoader } from '@llm-tools/embedjs-loader-pdf';
import { MutationFunction } from '@tanstack/react-query';


export async function POST(req: Request) {

    const { url } = await req.json();
    console.log("Received URL for RAG processing:", url);

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const ragApplication = await new RAGApplicationBuilder()
        .setModel(SIMPLE_MODELS['OPENAI_GPT3.5_TURBO'])
        .setEmbeddingModel(new OpenAiEmbeddings())
        .setVectorDatabase(new QdrantDb({
            apiKey: process.env.QDRANT_API_KEY || "",
            url: process.env.QDRANT_URL || "",
            clusterName: process.env.QDRANT_CLUSTER_NAME || ""
        }))
        .build();

    try {
        (async () => {
            const load = await ragApplication.addLoader(new PdfLoader({ filePathOrUrl: url }));
        })();

        return NextResponse.json({ message: "RAG process started" }, { status: 200 });
    } catch (error) {
        console.error("Error in RAG processing:", error);
        return NextResponse.json({ error: "Failed to start RAG process" }, { status: 500 });
    }
}