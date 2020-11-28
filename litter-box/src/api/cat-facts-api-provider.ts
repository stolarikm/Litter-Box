export default class CatFactsApiProvider {
    private static readonly baseUrl = "https://cat-fact.herokuapp.com";

    static async getRandomFact(): Promise<CatFact> {
        const response = await fetch(`${this.baseUrl}/facts/random`);
        return await response.json();
    }

    static async getRandomFacts(count: number): Promise<CatFact[]> {
        const response = await fetch(`${this.baseUrl}/facts/random?amount=${count}`);
        return await response.json();
    }

    static async getFact(id: string): Promise<CatFact> {
        const response = await fetch(`${this.baseUrl}/facts/${id}`);
        return await response.json();
    }
}