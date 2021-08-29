import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, enableDarkMode, disableDarkMode } from "../apollo";

const SDarkModeBtn = styled.span`
    cursor: pointer;
`;

function DarkModeBtn() {
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <SDarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </SDarkModeBtn>
    );
}

export default DarkModeBtn;
