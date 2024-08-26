import { Tensor } from "@xenova/transformers";
export type TJsonObject = { [key: string]: any };

export async function computeEmbeddings(texts: string[], model: string): Promise<number[][]> {
    const TransformersApi = Function('return import("@xenova/transformers")')();
    const { pipeline } = await TransformersApi;
    let extractor = await pipeline('feature-extraction', model);
    const embeddings: number[][] = [];

    for (const text of texts) {
        const embedding: Tensor = await extractor(text, { pooling: 'mean', normalize: true });
        embeddings.push(Array.from(embedding.data as Float32Array))
    }
    return embeddings
}

function computeCosineSimilarity(a: number[], b: number[]) {
    const dotProduct = a.reduce((sum, val, idx) => sum + val * b[idx], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

export function computeClosestMatch(sourceEmbedding: number[], targetEmbeddings: number[][], similarityThreshold: number): number | null {
    let maxSimilarity = -Infinity;
    let closestIndex = -1;

    for (let i = 0; i < targetEmbeddings.length; i++) {
        const similarity = computeCosineSimilarity(sourceEmbedding, targetEmbeddings[i]);
        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            closestIndex = i;
        }
    }

    return maxSimilarity >= similarityThreshold ? closestIndex : null;
}

export function createDefaultObject<T extends object>(interfaceStructure: T): T {
    const result: any = {};

    for (const key in interfaceStructure) {
        const value = interfaceStructure[key];
        if (typeof value === 'object' && value !== null) {
            result[key] = createDefaultObject(value);
        } else {
            switch (typeof value) {
                case 'string':
                    result[key] = '';
                    break;
                case 'number':
                    result[key] = 0;
                    break;
                case 'boolean':
                    result[key] = false;
                    break;
                default:
                    result[key] = null;
            }
        }
    }

    return result as T;
}

export function flattenObject(obj: TJsonObject, prefix = ''): TJsonObject {
    return Object.keys(obj).reduce((acc: TJsonObject, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
}

export function unflattenObject(obj: TJsonObject): TJsonObject {
    const result: TJsonObject = {};
    for (const key in obj) {
        const keys = key.split('.');
        keys.reduce((r: TJsonObject, k: string, i: number) => {
            return r[k] = i === keys.length - 1 ? obj[key] : (r[k] || {});
        }, result);
    }
    return result;
}