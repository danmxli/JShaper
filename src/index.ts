import { computeEmbeddings, computeCosineSimilarity, TSourceObject, TTargetInterface } from "./utils";

export class MapObject {
    private model: string;
    private similarityThreshold: number;
    private computeEmbeddings = computeEmbeddings;
    private computeCosineSimilarity = computeCosineSimilarity;

    /**
     * 
     * @param {string} model - the Hugging Face model to perform text feature extraction. Default is "Xenova/all-MiniLM-L6-v2"
     * @param {number} similarityThreshold - the cosine similarity threshold. Default is 0.5
     */
    constructor(model?: string, similarityThreshold?: number) {
        this.model = model || "Xenova/all-MiniLM-L6-v2"
        this.similarityThreshold = similarityThreshold || 0.5
    }

    /**
     * 
     * @param source - the JSON source object.
     * @param target - the interface to map the source object to.
     * @returns {any} TODO
     */
    async mapObject(source: TSourceObject, target: TTargetInterface): Promise<any> {
        
    }
}