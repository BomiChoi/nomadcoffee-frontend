import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.accent};
    h1 {
        font-size: 25px;
        padding-top: 5px;
        font-family: 'Nanum Pen Script', cursive;
    }
`;

export default HeaderContainer;