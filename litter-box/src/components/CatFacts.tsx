import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import useCatFacts from "../hooks/useCatFacts";
import CatFactCard from "./CatFactCard";

const useStyles = makeStyles({
    cardsContainer: {
        margin: "32px 0",
    },
});

const CatFacts: FC = () => {
    const { facts, loadMoreFacts } = useCatFacts();

    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.cardsContainer}>
            {facts?.map((fact, i) => (
                <Grid item xs={12} md={6} lg={4} key={i}>
                    <CatFactCard fact={fact} />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button variant="contained" onClick={loadMoreFacts}>
                    Load more facts
                </Button>
            </Grid>
        </Grid>
    );
};

export default CatFacts;
