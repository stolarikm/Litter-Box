import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import CatFactsApiProvider from "../api/cat-facts-api-provider";
import useCatFactCard from "./useCatFactCard";

export default function useFavoriteCatFacts() {
    const { userFavoriteFacts } = useCatFactCard();
    const [favoriteFacts, setFavoriteFacts] = useState<CatFact[]>([]);

    const fetchFavoriteFacts = async (ac: AbortController) => {
        // remove facts that are not in userFavoriteFacts
        const filteredFacts = favoriteFacts.filter(favFact => userFavoriteFacts.some(fact => favFact._id === fact.fact._id));
        const factsToFetch = userFavoriteFacts.filter(fact => !favoriteFacts.some(favFact => favFact._id === fact.fact._id));
        
        const promises = factsToFetch.map(fact => CatFactsApiProvider.getFact(fact.fact._id, ac.signal));
        try {
            const result = await Promise.all(promises);
            result.forEach(fact => {
                filteredFacts.push(fact);
            });
            setFavoriteFacts(filteredFacts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const ac = new AbortController();
        trackPromise(fetchFavoriteFacts(ac));
        return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userFavoriteFacts]);

    return {
        favoriteFacts,
    };
}
