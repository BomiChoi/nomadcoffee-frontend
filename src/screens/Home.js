import styled from "styled-components";
import { isLoggedInVar, darkModeVar } from "..//apollo";
import { useReactiveVar } from "@apollo/client";

const Container = styled.div``;
const Title = styled.h1``;
const LoginBtn = styled.button``;


function Home() {
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <Container>
            <Title>Home</Title>
            <LoginBtn onClick={() => isLoggedInVar(false)}>Log out now!</LoginBtn>
            {darkMode ?
                <button onClick={() => darkModeVar(false)}>Dark Mode</button>
                : <button onClick={() => darkModeVar(true)}>Light Mode</button>
            }
        </Container>
    );
}

export default Home;