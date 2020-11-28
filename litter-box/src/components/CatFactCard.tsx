import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React, { FC, useMemo } from "react";
import { useLoggedInUser } from "../firebase/firebase";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import useCatFacts from "../hooks/useCatFacts";

const useStyles = makeStyles({
    cardContent: {
        height: "100%",
    },
});

type Props = {
    fact: CatFact;
};

const CatFactCard: FC<Props> = ({ fact }) => {
    const classes = useStyles();
    const user = useLoggedInUser();
    const { userFavoriteFacts, markAsFavorite, removeFavorite } = useCatFacts();

    const isFavorite = useMemo(() => {
        return userFavoriteFacts.some(favoriteFact => favoriteFact.fact._id === fact._id);
    }, [userFavoriteFacts, fact])

    return (
        <Card variant="outlined" className={classes.cardContent}>
            {user && (
                <CardHeader
                    action={
                        <IconButton aria-label="Favorite" onClick={() => isFavorite ? removeFavorite(fact) : markAsFavorite(fact)}>
                            {isFavorite ? <StarIcon /> :<StarBorderIcon /> }
                        </IconButton>
                    }
                />
            )}
            <CardContent>
                <Typography variant="h5" component="p">
                    {fact.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CatFactCard;
