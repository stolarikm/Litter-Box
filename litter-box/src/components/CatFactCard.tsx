import {
    Card,
    CardContent,
    CardHeader,
    Fab,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useLoggedInUser } from "../firebase/firebase";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import useCatFactCard from "../hooks/useCatFactCard";
import CatPicApiProvider from "../api/cat-pic-api-provider";
import { FacebookIcon, FacebookShareButton } from "react-share";

const useStyles = makeStyles({
    cardContent: {
        height: "100%",
    },
    cardHeader: {
        backgroundImage: (props: { catPicUrl: string }) => 'url(' + props.catPicUrl + ')',
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "30%",
    },
    shareButton: {
        float: "left",
        marginRight: "10px",
    }
});

type Props = {
    fact: CatFact;
};

const CatFactCard: FC<Props> = ({ fact }) => {
    const user = useLoggedInUser();
    const { userFavoriteFacts, markAsFavorite, removeFavorite } = useCatFactCard();

    const [catPicUrl, setCatPicUrl] = useState<string>("");

    useEffect(() => {
        setCatPicUrl(CatPicApiProvider.getUniqueCatPicUrl(fact._id));
    }, [fact]);

    const isFavorite = useMemo(() => {
        return userFavoriteFacts.some(favoriteFact => favoriteFact.fact._id === fact._id);
    }, [userFavoriteFacts, fact])
    const classes = useStyles({ catPicUrl: catPicUrl });

    return (
        <Card variant="outlined" className={classes.cardContent}>
            <CardHeader className={classes.cardHeader}
                action={user ?
                    <>
                    <Fab aria-label="Favorite" onClick={() => isFavorite ? removeFavorite(fact) : markAsFavorite(fact)} >
                        {isFavorite ? <StarIcon color="primary" /> :<StarBorderIcon />} 
                    </Fab>
                    <FacebookShareButton className={classes.shareButton} url={catPicUrl} quote={fact.text}>
                        <FacebookIcon round size={60} />
                    </FacebookShareButton>
                    </> : <></>
                }
            />
            <CardContent>
                <Typography variant="h5" component="p">
                    {fact.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CatFactCard;
