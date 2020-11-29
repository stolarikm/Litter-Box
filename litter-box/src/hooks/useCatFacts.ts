import { useEffect, useState } from "react";
import CatFactsApiProvider from "../api/cat-facts-api-provider";

export default function useCatFacts() {
    const [facts, setFacts] = useState<CatFact[]>([]);

    const fetchFacts = async (abortSignal?: AbortSignal) => {
        try {
            const response = await CatFactsApiProvider.getRandomFacts(12, abortSignal);
            setFacts(facts.concat(response));
        } catch(error) {
            // console.log('request aborted', error);
        }
    };
    
    useEffect(() => {
        const ac = new AbortController();

        fetchFacts(ac.signal);

        return () => ac.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const loadMoreFacts = () => {
        fetchFacts();
    };

    return {
        facts,
        loadMoreFacts,
    };
}
