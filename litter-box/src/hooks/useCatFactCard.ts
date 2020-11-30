import { useEffect, useState } from "react";
import {
    FavoriteFact,
    favoriteFactsCollection,
    useLoggedInUser,
} from "../firebase/firebase";

export default function useCatFactCard() {
    const [favoriteFacts, setFavoriteFacts] = useState<FavoriteFact[]>([]);
    const [userFavoriteFacts, setUserFavoriteFacts] = useState<FavoriteFact[]>([]);

    const user = useLoggedInUser();
    
    useEffect(() => {
        const cancelSnapshotSubscription = favoriteFactsCollection.onSnapshot((snapshot) => {
            setFavoriteFacts(snapshot.docs.map((doc) => doc.data()));
        });

        return () => cancelSnapshotSubscription();
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
        userFavoriteFacts,
        markAsFavorite,
        removeFavorite,
    };
}
