import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React, { FC } from "react";

const useStyles = makeStyles({
    cardContent: {
      height: "100%"
    },
  });

type Props = {
    fact: CatFact;
};

const CatFactCard: FC<Props> = ({ fact }) => {
    const classes = useStyles();
    
    return (
        <Card variant="outlined" className={classes.cardContent}>
            <CardContent>
                <Typography variant="h5" component="p">
                    {fact.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CatFactCard;
