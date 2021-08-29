import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const SLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.accent};
`;
const SH1 = styled.h1`
    font-size: 25px;
        padding-top: 5px;
        font-family: 'Nanum Pen Script', cursive;
`;

function Logo({ size }) {
    return (
        <SLink to="/">
            <FontAwesomeIcon icon={faMugHot} size={size === "Large" ? "3x" : "2x"} />
            <SH1>Nomad Coffee</SH1>
        </SLink>
    );
};

export default Logo;