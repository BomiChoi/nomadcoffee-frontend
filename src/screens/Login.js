import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

const Container = styled.div``;
const Title = styled.h1``;
const LoginBtn = styled.button``;

// const Login = () => <h1>Login</h1>;
function Login() {
    return (
        <Container>
            <Title>Login</Title>
            <LoginBtn onClick={() => isLoggedInVar(true)}>Log in now!</LoginBtn>
        </Container>
    );
}

export default Login;