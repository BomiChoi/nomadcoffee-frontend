import styled from "styled-components";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SAvatar = styled.div`
  width: ${props => props.lg ? "30px" : "25px"};
  height: ${props => props.lg ? "30px" : "25px"};
  border-radius: 50%;
  background-color: ${(props) => props.theme.bgColor};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
  
`;

function Avatar({ url = "", lg = false }) {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : <FontAwesomeIcon icon={faUser} size="lg" />}</SAvatar>;
}
export default Avatar;