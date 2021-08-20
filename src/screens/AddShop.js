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
import FormError from "../components/auth/FormError";

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;
const Notification = styled.div`
  color: tomato;
`;

const CREATE_COFFEESHOP_MUTATION = gql`
    mutation createCoffeeShop(
        $name: String!
        $latitude: String!
        $longitude: String!
        $categoryTxt: String
    ){
    createCoffeeShop(
        name: $name
        latitude: $latitude
        longitude: $longitude
        categoryTxt: $categoryTxt
    ){
        name
    }
  }
`;

function AddShop() {
    const history = useHistory();
    const onCompleted = (data) => {
        const { createCoffeeShop: { ok, error } } = data;
        if (!ok) {
            setError("result", {
                message: error,
            })
        } else {
            history.push(routes.home, {
                message: "Coffeeshop created.",
            });
        }
    }
    const [createCoffeeShop, { loading }] = useMutation(CREATE_COFFEESHOP_MUTATION, { onCompleted });
    const {
        register,
        handleSubmit,
        errors,
        formState,
        setError,
        clearErrors
    } = useForm({
        mode: "onChange"
    });
    const onSubmitValid = (data) => {
        if (loading) { return; }
        createCoffeeShop({
            variables: {
                ...data,
            },
        });
    };
    const clearAddShopError = () => {
        clearErrors("result")
    };

    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faMugHot} size="3x" />
                    <Subtitle>
                        Add CoffeeShop
                    </Subtitle>
                </HeaderContainer>
                <Notification>{errors?.result?.message}</Notification>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        ref={register({
                            required: "Name is required",
                        })}
                        onChange={clearAddShopError}
                        name="name"
                        type="text"
                        placeholder="*Name"
                        hasError={Boolean(errors?.name?.message)}
                    />
                    <FormError message={errors?.name?.message} />

                    <Input
                        ref={register({
                            required: "Latitude is required",
                        })}
                        onChange={clearAddShopError}
                        name="latitude"
                        type="text"
                        placeholder="*Latitude"
                        hasError={Boolean(errors?.latitude?.message)}

                    />
                    <FormError message={errors?.latitude?.message} />

                    <Input
                        ref={register({
                            required: "Longitude is required",
                        })}
                        onChange={clearAddShopError}
                        name="longitude"
                        type="text"
                        placeholder="*Longitude"
                        hasError={Boolean(errors?.longitude?.message)}

                    />
                    <FormError message={errors?.longitude?.message} />

                    <Input
                        ref={register}
                        onChange={clearAddShopError}
                        name="categoryTxt"
                        type="text"
                        placeholder="CategoryTxt"
                        hasError={Boolean(errors?.categoryTxt?.message)}
                    />
                    <FormError message={errors?.categoryTxt?.message} />

                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Add"}
                        disabled={!formState.isValid || loading}
                    />
                </form>
            </FormBox>
        </AuthLayout>
    );
}

export default AddShop;