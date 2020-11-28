import { useEffect, useState } from "react";
import CatFactsApiProvider from "../api/cat-facts-api-provider";

export default function useCatFacts() {
    const [facts, setFacts] = useState<CatFact[]>([]);

    const fetchFacts = async () => {
        setFacts(facts.concat(await CatFactsApiProvider.getRandomFacts(12)));
    };

    useEffect(() => {
        fetchFacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMoreFacts = () => {
        fetchFacts();
    };

    return {
        facts,
        loadMoreFacts
    };
}
