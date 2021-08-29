import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import AddShop from "./screens/AddShop"
import EditShop from "./screens/EditShop"
import { isLoggedInVar, darkModeVar } from "./apollo";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { client } from "./apollo";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? <Home /> : <Login />}
              </Route>
              <Route path={routes.signUp}>
                <SignUp />
              </Route>
              {isLoggedIn ? (
                <>
                  <Route path={routes.add}>
                    <AddShop />
                  </Route>
                  <Route path={routes.shop}>
                    <EditShop />
                  </Route>
                </>
              ) : null
              }
              <Route>
                {/* <NotFound /> */}
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;

