import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

export const lightTheme = {
  accent: "chocolate",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
  facebook: "#385285",
};

export const darkTheme = {
  accent: "chocolate",
  fontColor: "white",
  bgColor: "#2c2c2c",
  borderColor: "rgb(219, 219, 219)",
  facebook: "#0095f6",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${props => props.theme.bgColor};
        font-size:14px;
        font-family: 'Nanum Gothic', sans-serif;
        color: ${props => props.theme.fontColor};
    }
    input {
      all:unset;
    }
    a {
      all:unset;
      cursor: pointer;
    }
    button {
      all:unset;
      cursor: pointer;
    }
`;