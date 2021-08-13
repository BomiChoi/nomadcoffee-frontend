import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

export const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "white",
};

export const darkTheme = {
    fontColor: "white",
    bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
    }
    h1 {
        color: ${(props) => props.theme.fontColor};
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    button {
        border: 1px solid ${(props) => props.theme.fontColor};
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.fontColor};
    }
`;