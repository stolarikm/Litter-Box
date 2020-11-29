export default class CatFactsApiProvider {
    private static readonly baseUrl = "https://cat-fact.herokuapp.com";

    static async getRandomFact(): Promise<CatFact> {
        const response = await fetch(`${this.baseUrl}/facts/random`);
        return await response.json();
    }

    static async getRandomFacts(count: number, abortSignal?: AbortSignal): Promise<CatFact[]> {
        const response = await fetch(`${this.baseUrl}/facts/random?amount=${count}`, {signal: abortSignal});
        return await response.json();
    }

    static async getFact(id: string, abortSignal?: AbortSignal): Promise<CatFact> {
        const response = await fetch(`${this.baseUrl}/facts/${id}`, {signal: abortSignal});
        return await response.json();
    }
}