import { useReactiveVar } from "@apollo/client";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import Logo from "./Logo";
import { Link, useHistory } from "react-router-dom";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
    padding: 0 20px;
    box-sizing: border-box;
`;

const Icon = styled.span`
  margin-left: 15px;
`;
const LogoutBtn = styled.button`
    background: none;
    /* border: 1px solid ${props => props.theme.accent}; */
    /* border-radius: 5px; */
    border: none;
    padding: 5px;
    margin: 5px;
    font-weight: bold;
`;

function Header() {
    const history = useHistory();
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (
        <SHeader>
            <Wrapper>
                <Column>
                    <Link to="/"><Logo /></Link>
                </Column>
                <Column>
                    {isLoggedIn ? (
                        <>
                            <Icon>
                                <FontAwesomeIcon icon={faUser} size="lg" />
                            </Icon>
                            <LogoutBtn onClick={() => logUserOut(history)}>Log out</LogoutBtn>
                        </>
                    ) : null}
                </Column>
            </Wrapper>
        </SHeader>
    );
}
export default Header;