//API source https://cataas.com/#/
export default class CatPicApiProvider {
    private static readonly baseUrl = "https://cataas.com/";

    static async getRandomCatPicUrl(): Promise<string> {
        //add random parameter to URL to get uncached image
        const response = await fetch(`${this.baseUrl}/cat?width=600&height=450&_${Math.random()}`);
        //get image data
        const imgData = await response.blob();
        //create local URL to fetched image
        return URL.createObjectURL(imgData);
    }
}