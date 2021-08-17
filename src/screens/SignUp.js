import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import HeaderContainer from "../components/auth/HeaderContainer";
import routes from "../routes";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";


const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String! 
        $email: String!
        $name: String!
        $location: String!
        $password: String!
        $avatarURL: String
        $githubUsername: String!
    ){
    createAccount(
        username: $username
        email: $email
        firstName: $firstName
        name: $name
        location: $location
        password: $password
        avatarURL: $avatarURL
        githubUsername: $username
    ){
        ok
        error
    }
  }
`;

function SignUp() {
    const history = useHistory();
    const onCompleted = (data) => {
        const { username, password } = getValues();
        const { createAccount: { ok, error } } = data;
        if (!ok) { return; }
        history.push(routes.home, {
            message: "Account created. Please log in.",
            username,
            password
        });
    }
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted });
    const {
        register,
        handleSubmit,
        errors,
        formState,
        getValues
    } = useForm({
        mode: "onChange"
    });
    const onSubmitValid = (data) => {
        if (loading) { return; }
        createAccount({
            variables: {
                ...data,
            },
        });
    };
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faMugHot} size="3x" />
                    <Subtitle>
                        Sign up to see photos and videos from your friends.
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        ref={register({
                            required: "Username is required",
                        })}
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                    <Input
                        ref={register({
                            required: "Email is required",
                        })}
                        type="text"
                        placeholder="Email"
                        name="email"
                    />

                    <Input
                        ref={register({
                            required: "Name is required",
                        })}
                        type="text"
                        placeholder="Name"
                        name="name"
                    />
                    <Input
                        ref={register({
                            required: "Location is required",
                        })}
                        type="text"
                        placeholder="Location"
                        name="location"
                    />
                    <Input
                        ref={register({
                            required: "GithubUsername is required",
                        })}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <Input
                        ref={register}
                        type="text"
                        placeholder="AvatarURL"
                        name="avatarURL"
                    />
                    <Input
                        ref={register({
                            required: "Password is required",
                        })}
                        type="text"
                        placeholder="githubUsername"
                        name="githubUsername"
                    />
                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />
                </form>
            </FormBox>
            <BottomBox
                cta="Have an acount?"
                linkText="Log in"
                link={routes.home}
            />
        </AuthLayout>
    );
}

export default SignUp;