import { Button, CircularProgress, Grid } from "@material-ui/core";
import React, { FC } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import useCatFacts from "../hooks/useCatFacts";
import CatFactCard from "./CatFactCard";

const CatFacts: FC = () => {
    const { facts, loadMoreFacts } = useCatFacts();
    const { promiseInProgress } = usePromiseTracker();

    return (
        <>
            {facts.length ? (
                <Grid container spacing={3}>
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
