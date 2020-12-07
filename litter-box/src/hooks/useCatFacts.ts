import { useEffect, useState } from "react";
import CatFactsApiProvider from "../api/cat-facts-api-provider";
import { addCatPics } from "../utils/catPicUtils";
import { trackPromise } from "react-promise-tracker"

export default function useCatFacts() {
    const [facts, setFacts] = useState<CatFact[]>([]);

    const fetchFacts = async (abortSignal?: AbortSignal) => {
        try {
            const response = await CatFactsApiProvider.getRandomFacts(12, abortSignal);
            const responseWithPics = await addCatPics(response);
            setFacts(facts.concat(responseWithPics));
        } catch(error) {
            // console.log('request aborted', error);
        }
    };
    
    useEffect(() => {
        const ac = new AbortController();

        trackPromise(fetchFacts(ac.signal));

        return () => ac.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const loadMoreFacts = () => {
        trackPromise(fetchFacts());
    };

    return {
        facts,
        loadMoreFacts,
    };
}
