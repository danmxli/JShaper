import { Tensor } from "@xenova/transformers";
export type TSourceObject = { [key: string]: any };
export type TTargetInterface = { [key: string]: any };

export async function computeEmbeddings(texts: string[], model: string): Promise<Float32Array> {
    const TransformersApi = Function('return import("@xenova/transformers")')();
    const { pipeline } = await TransformersApi;

    let extractor = await pipeline('feature-extraction', model);
    const embeddings: Tensor = await extractor(texts, { pooling: 'mean', normalize: true });

    // TODO
    return embeddings.data as Float32Array
}

export function computeCosineSimilarity(vecA: any, vecB: any): number {

    // TODO
    return 0
}