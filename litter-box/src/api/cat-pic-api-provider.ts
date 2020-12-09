//API source https://cataas.com/#/

export default class CatPicApiProvider {
    private static readonly baseUrl = "https://cataas.com";

    static getUniqueCatPicUrl(id: string): string {
        //add random parameter to URL to get uncached image
        return `${this.baseUrl}/cat?uniqueNum=${id}&width=600&height=450`;
    }

    static getCatMemeUrl(
        uniqueNum: number,
        caption: string,
        type: string,
        color: string,
        filter: string,
        gif: boolean,
        ): string {

        var firstPartOfUrl = `${this.baseUrl}/cat${gif ? '/gif' : (type ? '/' + type.toLowerCase() : '')}${caption ? '/says/' + caption : ''}`;

        var url = new URL(firstPartOfUrl);
        if (filter) {
            url.searchParams.append("filter", filter);
        }
        url.searchParams.append("color", color);
        if (gif) {
            //setting lower size for gifs, to avoid large files
            url.searchParams.append("width", "200");
            url.searchParams.append("height", "200");
        } else {
            url.searchParams.append("width", "600");
            url.searchParams.append("height", "600");
        }
        url.searchParams.append("uniqueNum", uniqueNum.toString());
        return url.toString();
    }
}