import {
    Button,
    CardContent,
    Card,
    CardActions,
    Grid,
    makeStyles,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    CardMedia,
    CircularProgress,
} from "@material-ui/core";
import React, { FC, useState } from "react";
import CatPicApiProvider from "../api/cat-pic-api-provider";

const useStyles = makeStyles({
    actionArea: {
        display: "block",
    },
    checkbox: {
        float: "left",
        margin: "auto",
    },
    button: {
        margin: "10px",
    },
});

const MemeGenerator: FC = () => {
    const classes = useStyles();
    const [caption, setCaption] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [color, setColor] = useState<string>("white");
    const [filter, setFilter] = useState<string>("");
    const [gif, setGif] = useState<boolean>(false);
    const [imageDataUrl, setImageDataUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const toDataURL = (url: string) => {
        return fetch(url)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                return URL.createObjectURL(blob);
            });
    };

    const generateImageDataUrl = async () => {
        //refresh uniqueNum to get new pic every preview
        var newUniqueNumber = Math.random();
        const imageUrl = CatPicApiProvider.getCatMemeUrl(
            newUniqueNumber,
            caption,
            tag,
            color,
            filter,
            gif
        );
        setLoading(true);
        const dataUrl = await toDataURL(imageUrl);
        setImageDataUrl(dataUrl);
        setLoading(false);
        return dataUrl;
    };

    const downloadClickHandler = async () => {
        let url = imageDataUrl
        if (!url) {
            url = await generateImageDataUrl();
        }

        const a = document.createElement("a");
        a.href = url;
        a.download = `catMeme.${gif ? "gif" : "png"}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const previewClickHandler = async () => {
        await generateImageDataUrl();
    };

    return (
        <Grid
            container
            spacing={1}
            justify="center"
        >
            <Grid item lg={8} md={9} sm={10} xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h1">
                            Cat meme generator
                        </Typography>
                        <TextField
                            label="Caption"
                            name="caption"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <TextField
                            label="Tag"
                            name="tag"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            disabled={gif}
                        />
                        <FormControl
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        >
                            <InputLabel id="textColor">Color</InputLabel>
                            <Select
                                labelId="textColor"
                                id="textColorSelect"
                                value={color}
                                onChange={(e) =>
                                    setColor(e.target.value as string)
                                }
                                label="Color"
                            >
                                <MenuItem value="white" selected>
                                    White
                                </MenuItem>
                                <MenuItem value="black">Black</MenuItem>
                                <MenuItem value="red">Red</MenuItem>
                                <MenuItem value="green">Green</MenuItem>
                                <MenuItem value="blue">Blue</MenuItem>
                                <MenuItem value="orange">Orange</MenuItem>
                                <MenuItem value="yellow">Yellow</MenuItem>
                                <MenuItem value="pink">Pink</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        >
                            <InputLabel id="filter">Filter</InputLabel>
                            <Select
                                labelId="filter"
                                id="filterSelect"
                                value={filter}
                                onChange={(e) =>
                                    setFilter(e.target.value as string)
                                }
                                label="FIlter"
                            >
                                <MenuItem value="" selected>
                                    None
                                </MenuItem>
                                <MenuItem value="blur">Blur</MenuItem>
                                <MenuItem value="mono">Mono</MenuItem>
                                <MenuItem value="sepia">Sepia</MenuItem>
                                <MenuItem value="negative">Negative</MenuItem>
                                <MenuItem value="paint">Paint</MenuItem>
                                <MenuItem value="pixel">Pixel</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            className={classes.checkbox}
                            control={
                                <Checkbox
                                    checked={gif}
                                    onChange={() => setGif(!gif)}
                                    name="gifChecked"
                                    color="primary"
                                    disabled={!!tag}
                                />
                            }
                            label="Gif"
                        />
                        {loading ? (
                            <CircularProgress />
                        ) : imageDataUrl ? (
                            <Grid container justify="center">
                                <Grid item xs={8}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt="Not found"
                                            image={imageDataUrl}
                                            title="Cat meme"
                                        />
                                    </Card>
                                </Grid>
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </CardContent>
                    <CardActions className={classes.actionArea}>
                        <Button
                            className={classes.button}
                            variant="text"
                            size="large"
                            color="primary"
                            onClick={previewClickHandler}
                            disabled={loading}
                        >
                            Preview
                        </Button>
                        <Button
                            className={classes.button}
                            variant="text"
                            size="large"
                            color="primary"
                            onClick={downloadClickHandler}
                            disabled={loading}
                        >
                            Download
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default MemeGenerator;
