import {
    CircularProgress,
    Grid,
    Typography,
} from "@material-ui/core";
import React, { FC } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import useFavoriteCatFacts from "../hooks/useFavoriteCatFacts";
import CatFactCard from "./CatFactCard";

const FavoriteCatFacts: FC = () => {
    const { favoriteFacts } = useFavoriteCatFacts();
    const { promiseInProgress } = usePromiseTracker();

    return (
        <>
            {favoriteFacts.length ? (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2">
                            Your favorite facts!
                        </Typography>
                    </Grid>
                    {favoriteFacts?.map((fact, i) => (
                        <Grid item xs={12} md={6} lg={4} key={i}>
                            <CatFactCard fact={fact} />
                        </Grid>
                    ))}
                </Grid>
            ) : (promiseInProgress ? <CircularProgress /> : (
                <Typography variant="h2" component="h2">
                    No favorite facts yet
                </Typography>
            ))}
        </>
    );
};

export default FavoriteCatFacts;
