import styled from "styled-components";

const SNotification = styled.div`
  color: ${props => props.type === "ok" ? "#2ecc71" : "tomato"};
`;

function Notification({ message }) {
    return <SNotification>{message}</SNotification>
}

export default Notification;