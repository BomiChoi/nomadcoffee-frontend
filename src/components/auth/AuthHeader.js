import styled from "styled-components";
import Logo from "../Logo";
import Subtitle from "../Subtitle";

const HeaderContainer = styled.div`
`;

function AuthHeader({ subtitle }) {
    return (
        <HeaderContainer>
            <Logo size="Large" />
            <Subtitle>
                {subtitle}
            </Subtitle>
        </HeaderContainer>
    );
}

export default AuthHeader;