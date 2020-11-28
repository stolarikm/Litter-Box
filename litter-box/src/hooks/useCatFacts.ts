import { useEffect, useState } from "react";
import CatFactsApiProvider from "../api/cat-facts-api-provider";
import {
    FavoriteFact,
    favoriteFactsCollection,
    useLoggedInUser,
} from "../firebase/firebase";

export default function useCatFacts() {
    const [facts, setFacts] = useState<CatFact[]>([]);
    const [favoriteFacts, setFavoriteFacts] = useState<FavoriteFact[]>([]);
    const [userFavoriteFacts, setUserFavoriteFacts] = useState<FavoriteFact[]>([]);

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

    const user = useLoggedInUser();

    
    useEffect(() => {
        favoriteFactsCollection.onSnapshot((snapshot) => {
            setFavoriteFacts(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);

    useEffect(() => {
        // load favorites after sign in
        setUserFavoriteFacts(favoriteFacts.filter(fact => fact.by.uid === user?.uid));
    }, [user, favoriteFacts]);

    const markAsFavorite = (fact: CatFact) => {
        const favoriteFact = {
            by: { uid: user?.uid ?? "" },
            fact: { _id: fact._id },
        };
        favoriteFactsCollection.add(favoriteFact);
    };

    const removeFavorite = async (fact: CatFact) => {
        const favoriteFact = await favoriteFactsCollection.where("by.uid", "==", user?.uid ?? "").where("fact._id", "==", fact._id).get();
        
        favoriteFact.docs.forEach(x => {
            x.ref.delete();
        });
    };

    return {
        facts,
        loadMoreFacts,
        userFavoriteFacts,
        markAsFavorite,
        removeFavorite,
    };
}
