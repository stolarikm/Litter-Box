import CatPicApiProvider from "../api/cat-pic-api-provider";

export const addCatPics = async (currentFacts: CatFact[]) => {
    const catPicPromises: Promise<string>[] = [];
    const newPicsNeeded: number = currentFacts.filter(f => !f.linkedPicUrl).length;
    const result: CatFact[] = currentFacts;
    for (var i = 0; i < newPicsNeeded; i++) {
        catPicPromises.push(CatPicApiProvider.getRandomCatPicUrl());
    }

    await Promise.all(catPicPromises).then((catPicUrls) => {
        var picIndex = 0;
        for (const value of result) {
            if (!value.linkedPicUrl) {
                value.linkedPicUrl = catPicUrls[picIndex++];     
            }
        }
    });
    return result;
}
