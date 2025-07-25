"use server";

import { RAGApplicationBuilder, SIMPLE_MODELS } from '@llm-tools/embedjs';
import { OpenAiEmbeddings } from '@llm-tools/embedjs-openai';
import { WebLoader } from '@llm-tools/embedjs-loader-web';
import { QdrantDb } from '@llm-tools/embedjs-qdrant';
import { PdfLoader } from '@llm-tools/embedjs-loader-pdf';
import { MutationFunction } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
    try {
        const response = await fetch(`${BASE_URL}/api/rag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}

export const extractPDFWithRAGMutation: MutationFunction<any, string> = async (url: string) => {
    try {
        const response = await fetch(`${BASE_URL}/api/rag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}