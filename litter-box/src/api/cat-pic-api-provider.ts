//API source https://cataas.com/#/
export default class CatPicApiProvider {
    private static readonly baseUrl = "https://cataas.com";

    static getUniqueCatPicUrl(id: string): string {
        //add random parameter to URL to get uncached image
        return `${this.baseUrl}/cat?uniqueNum=${id}&width=600&height=450`;
    }
}