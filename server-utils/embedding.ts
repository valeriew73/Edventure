import { qdrantClient } from '@/lib/qdrant';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function getContextFromQdrant(userQuery: string) {
    // Step 1: Embed the query
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: userQuery,
    });

    const vector = embedding.data[0].embedding;

    // Step 2: Search Qdrant
    const result = await qdrantClient.search(process.env.QDRANT_CLUSTER_NAME || "", {
        vector,
        limit: 10,
        with_payload: true,
    });

    // Step 3: Extract relevant text chunks
    return result.map(item => item.payload?.text).join('\n\n');
}
