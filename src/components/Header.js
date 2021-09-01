import { useReactiveVar } from "@apollo/client";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import Logo from "./Logo";
import { Link, useHistory } from "react-router-dom";
import Avatar from "./Avatar";
import useUser from "../hooks/useUser";
import routes from "../routes";
import DarkmodeBtn from "./DarkmodeBtn";

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
    color: ${(props) => props.theme.fontColor};
`;
const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SLink = styled(Link)`
 color: ${(props) => props.theme.fontColor};
`;

function Header() {
    const history = useHistory();
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useUser();
    return (
        <SHeader>
            <Wrapper>
                <Column>
                    <Link to="/"><Logo /></Link>
                </Column>
                <Column>
                    {isLoggedIn ? (
                        <IconsContainer>
                            <Icon>
                                <FontAwesomeIcon icon={faHome} size="lg" />
                            </Icon>
                            <Icon>
                                <FontAwesomeIcon icon={faCompass} size="lg" />
                            </Icon>
                            <Icon>
                                <Avatar url={data?.me?.avatarURL} />
                            </Icon>
                            <LogoutBtn onClick={() => logUserOut(history)}>Log out</LogoutBtn>
                            <DarkmodeBtn />
                        </IconsContainer>
                    ) : (
                        <SLink to={routes.home}>
                            <Button>Login</Button>
                        </SLink>
                    )}
                </Column>
            </Wrapper>
        </SHeader>
    );
}
export default Header;