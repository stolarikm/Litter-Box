import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import useCatFacts from "../hooks/useCatFacts";
import CatFactCard from "./CatFactCard";

const useStyles = makeStyles({
    cardsContainer: {
        margin: "32px 0",
    },
});

const CatFacts: FC = () => {
    const { facts, loadMoreFacts } = useCatFacts();
    const { promiseInProgress } = usePromiseTracker();
    const classes = useStyles();

    return (
        <>
            {facts.length ? (
                <Grid container spacing={3} className={classes.cardsContainer}>
                    {facts?.map((fact, i) => (
                        <Grid item xs={12} md={6} lg={4} key={i}>
                            <CatFactCard fact={fact} />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        {promiseInProgress ? (
                            <CircularProgress />
                        ) : (
                            <Button variant="contained" onClick={loadMoreFacts}>
                                Load more facts
                            </Button>
                        )}
                    </Grid>
                </Grid>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};

export default CatFacts;
