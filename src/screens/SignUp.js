import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import Notification from "../components/Notification";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import FormError from "../components/auth/FormError";

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
        name: $name
        location: $location
        password: $password
        avatarURL: $avatarURL
        githubUsername: $githubUsername
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
        if (!ok) {
            setError("result", {
                message: error,
            })
        } else {
            history.push(routes.home, {
                message: "Account created. Please log in.",
                username,
                password
            });
        }
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted });
    const {
        register,
        handleSubmit,
        errors,
        formState,
        getValues,
        setError,
        clearErrors
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
    const clearSignUpError = () => {
        clearErrors("result")
    };

    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <AuthHeader subtitle="Sign up to see photos and videos from your friends." />
                <Notification message={errors?.result?.message} />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        ref={register({
                            required: "Username is required.",
                            minLength: {
                                value: 5,
                                message: "Username should be longer than 5 chars.",
                            },
                        })}
                        onChange={clearSignUpError}
                        name="username"
                        type="text"
                        placeholder="*Username"
                        hasError={Boolean(errors?.username?.message)}
                    />
                    <FormError message={errors?.username?.message} />

                    <Input
                        ref={register({
                            required: "Password is required",
                        })}
                        onChange={clearSignUpError}
                        name="password"
                        type="password"
                        placeholder="*Password"
                        hasError={Boolean(errors?.password?.message)}
                    />
                    <FormError message={errors?.password?.message} />

                    <Input
                        ref={register({
                            required: "Email is required",
                        })}
                        onChange={clearSignUpError}
                        name="email"
                        type="text"
                        placeholder="*Email"
                        hasError={Boolean(errors?.email?.message)}
                    />
                    <FormError message={errors?.email?.message} />

                    <Input
                        ref={register({
                            required: "Name is required",
                        })}
                        onChange={clearSignUpError}
                        name="name"
                        type="text"
                        placeholder="*Name"
                        hasError={Boolean(errors?.name?.message)}
                    />
                    <FormError message={errors?.name?.message} />

                    <Input
                        ref={register({
                            required: "*Location is required",
                        })}
                        onChange={clearSignUpError}
                        name="location"
                        type="text"
                        placeholder="*Location"
                        hasError={Boolean(errors?.location?.message)}
                    />
                    <FormError message={errors?.location?.message} />

                    <Input
                        ref={register}
                        onChange={clearSignUpError}
                        name="avatarURL"
                        type="text"
                        placeholder="AvatarURL"
                        hasError={Boolean(errors?.avatarURL?.message)}
                    />
                    <FormError message={errors?.avatarURL?.message} />

                    <Input
                        ref={register({
                            required: "GithubUsername is required",
                        })}
                        onChange={clearSignUpError}
                        name="githubUsername"
                        type="text"
                        placeholder="*GithubUsername"
                        hasError={Boolean(errors?.githubUsername?.message)}
                    />
                    <FormError message={errors?.githubUsername?.message} />

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