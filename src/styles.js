import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

export const lightTheme = {
  accent: "chocolate",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
      box-sizing:border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size:14px;
        font-family: 'Nanum Gothic', sans-serif;
        color: rgb(38, 38, 38);
    }
    input {
      all:unset;
    }
    a {
      text-decoration: none;
    }
`;