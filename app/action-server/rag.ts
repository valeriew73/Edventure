"use server";

import { RAGApplicationBuilder, SIMPLE_MODELS } from '@llm-tools/embedjs';
import { OpenAiEmbeddings } from '@llm-tools/embedjs-openai';
import { WebLoader } from '@llm-tools/embedjs-loader-web';
import { QdrantDb } from '@llm-tools/embedjs-qdrant';
import { PdfLoader } from '@llm-tools/embedjs-loader-pdf';

export async function extractWebWithRAG(url: string) {
    const ragApplication = await new RAGApplicationBuilder()
        .setModel(SIMPLE_MODELS.OPENAI_GPT4_O)
        .setEmbeddingModel(new OpenAiEmbeddings())
        .setVectorDatabase(new QdrantDb({
            apiKey: process.env.QDRANT_API_KEY || "",
            url: process.env.QDRANT_URL || "",
            clusterName: process.env.QDRANT_CLUSTER_NAME || ""
        }))
        .build();

    await ragApplication.addLoader(new WebLoader({ urlOrContent: url }));

    const load = await ragApplication.query('What is the net worth of Elon Musk today?')

    return load;
}


export async function extractPDFWithRAG(url: string) {
    const ragApplication = await new RAGApplicationBuilder()
        .setModel(SIMPLE_MODELS['OPENAI_GPT3.5_TURBO'])
        .setEmbeddingModel(new OpenAiEmbeddings())
        .setVectorDatabase(new QdrantDb({
            apiKey: process.env.QDRANT_API_KEY || "",
            url: process.env.QDRANT_URL || "",
            clusterName: process.env.QDRANT_CLUSTER_NAME || ""
        }))
        .build();

    const load = await ragApplication.addLoader(new PdfLoader({ filePathOrUrl: url }));

    return load;
}