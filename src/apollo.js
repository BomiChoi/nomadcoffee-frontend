import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
}

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri: "https://bomi-nomadcoffee-backend.herokuapp.com/graphql",
    cache: new InMemoryCache(),
});