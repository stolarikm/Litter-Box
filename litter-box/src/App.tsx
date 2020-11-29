import { FC } from "react";
import "./App.css";
import { signOut, useLoggedInUser } from "./firebase/firebase";
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Toolbar,
} from "@material-ui/core";
import Notfound from "./components/NotFound";
import Home from "./pages/Home";
import Login from "./components/Login";
import Catbot from "./components/Catbot";
import Favorites from "./pages/Favorites";

const App: FC = () => {
    const user = useLoggedInUser();

    return (
        <Router>
            <AppBar color="primary" position="static" variant="outlined">
                <Toolbar>
                    <Link to="/">
                        <Button>Home</Button>
                    </Link>
                    {user === null && (
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    )}
                    {user && (
                        <>
                            <Link to="/favorites">
                                <Button>Favorites</Button>
                            </Link>
                            <Button onClick={signOut}>Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {user === null && <Redirect to="/login" />}

            <main className="App">
                <Container>
                    {user === undefined ? (
                        <CircularProgress />
                    ) : (
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/login" exact component={Login} />
                            <Route
                                path="/favorites"
                                exact
                                component={Favorites}
                            />
                            <Route component={Notfound} />
                        </Switch>
                    )}
                </Container>
            </main>
            {user !== null && <Catbot />}
        </Router>
    );
};

export default App;
