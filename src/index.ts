import { computeEmbeddings, computeClosestMatch, TJsonObject, flattenObject, unflattenObject } from "./utils";

export class MapObject {
    private model: string;
    private similarityThreshold: number;
    private computeEmbeddings = computeEmbeddings;
    private computeClosestMatch = computeClosestMatch;
    private flattenObject = flattenObject;
    private unflattenObject = unflattenObject;

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
     * @param target - the JSON target object that the source object maps to.
     * @returns {TJsonObject} the target object with populated values from source.
     */
    async mapObject(source: TJsonObject, target: TJsonObject): Promise<TJsonObject> {
        const flatSourceObj = this.flattenObject(source);
        const flatTargetObj = this.flattenObject(target);
        const sourceKeys = Object.keys(flatSourceObj);
        const targetKeys = Object.keys(flatTargetObj);
        const sourceEmbeddings = await this.computeEmbeddings(sourceKeys, this.model);
        const targetEmbeddings = await this.computeEmbeddings(targetKeys, this.model);

        const flatResult: TJsonObject = {}
        for (let i = 0; i < sourceKeys.length; i++) {
            const sourceKey = sourceKeys[i];
            const sourceEmbedding: number[] = sourceEmbeddings[i];
            const closestTargetIndex = this.computeClosestMatch(sourceEmbedding, targetEmbeddings, this.similarityThreshold);

            if (closestTargetIndex !== null) {
                const closestTargetKey = targetKeys[closestTargetIndex];
                flatResult[closestTargetKey] = flatSourceObj[sourceKey];
            }
        }

        return this.unflattenObject(flatResult);
    }
}