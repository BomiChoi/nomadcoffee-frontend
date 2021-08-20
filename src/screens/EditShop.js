import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import HeaderContainer from "../components/auth/HeaderContainer";
import routes from "../routes";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, gql } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useParams, useHistory } from 'react-router-dom';

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;
const Notification = styled.div`
  color: tomato;
`;

const SEE_COFFEESHOP_QUERY = gql`
    query seeCoffeeShop($id: Int!){
        seeCoffeeShop(id: $id){
            name
            latitude
            longitude
            categories{name}
        }
    }
`;
const EDIT_COFFEESHOP_MUTATION = gql`
    mutation EditCoffeeShop(
        $id: Int!
        $name: String!
        $latitude: String!
        $longitude: String!
        $categoryTxt: String
    ){
    editCoffeeShop(
        id: $id
        name: $name
        latitude: $latitude
        longitude: $longitude
        categoryTxt: $categoryTxt
    ){
        ok
        error
    }
  }
`;
const DELETE_COFFEESHOP_MUTATION = gql`
    mutation DeteteCoffeeShop($id: Int!){
        deleteCoffeeShop(id: $id){
            ok
            error
        }
    }
`;

function EditShop() {
    const history = useHistory();

    // see Coffeeshop
    const { id: strId } = useParams();
    const id = parseInt(strId);
    const { data: shopData, loading: shopLoading } = useQuery(SEE_COFFEESHOP_QUERY, {
        variables: { id }
    });
    let categoryTxt = ""
    if (!shopLoading) {
        categoryTxt = shopData.seeCoffeeShop.categories.map(category => category.name).join(" ");
    }

    // Edit Coffeeshop
    const onEditCompleted = (data) => {
        const { editCoffeeShop: { ok, error } } = data;
        if (!ok) {
            setError("result", {
                message: error,
            })
        } else {
            history.push(routes.home, {
                message: "Coffeeshop edited.",
            });
        }
    }
    const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEESHOP_MUTATION, { onEditCompleted });
    const {
        register,
        handleSubmit,
        errors,
        formState,
        setError,
        clearErrors
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: shopData?.seeCoffeeShop?.name || "",
            latitude: shopData?.seeCoffeeShop?.latitude || "",
            longitude: shopData?.seeCoffeeShop?.longitude || "",
            categoryTxt: categoryTxt || "",
        }
    });
    const onSubmitValid = (data) => {
        if (loading) { return; }
        editCoffeeShop({
            variables: {
                id,
                ...data,
            },
        });
    };
    const clearEditShopError = () => {
        clearErrors("result")
    };

    // Delete Coffeeshop
    const onDeleteCompleted = (data) => {
        const { editCoffeeShop: { ok, error } } = data;
        if (!ok) {
            setError("result", {
                message: error,
            })
        } else {
            history.push(routes.home, {
                message: "Coffeeshop edited.",
            });
        }
    }
    const [deleteCoffeeShop] = useMutation(DELETE_COFFEESHOP_MUTATION, { onDeleteCompleted });
    const deleteShop = () => {
        const data = deleteCoffeeShop({
            variables: {
                id
            },
        });
        const { deleteCoffeeShop: { ok } } = data;
        if (!ok) { return; }
        history.push(routes.home, {
            message: "Deleted Coffeeshop.",
        });
    }

    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faMugHot} size="3x" />
                    <Subtitle>
                        Edit CoffeeShop
                    </Subtitle>
                </HeaderContainer>
                <Notification>{errors?.result?.message}</Notification>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    {loading ? null : <>
                        <Input
                            ref={register({
                                required: "Name is required",
                            })}
                            onChange={clearEditShopError}
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
                            onChange={clearEditShopError}
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
                            onChange={clearEditShopError}
                            name="longitude"
                            type="text"
                            placeholder="*Longitude"
                            hasError={Boolean(errors?.longitude?.message)}

                        />
                        <FormError message={errors?.longitude?.message} />

                        <Input
                            ref={register}
                            onChange={clearEditShopError}
                            name="categoryTxt"
                            type="text"
                            placeholder="CategoryTxt"
                            hasError={Boolean(errors?.categoryTxt?.message)}
                        />
                        <FormError message={errors?.categoryTxt?.message} />

                        <Button
                            type="submit"
                            value={loading ? "Loading..." : "Edit"}
                            disabled={!formState.isValid || loading}
                        />
                        <Button
                            value={loading ? "Loading..." : "Delete"}
                            onClick={deleteShop}
                        />
                    </>}
                </form>
            </FormBox>
        </AuthLayout>
    );
}

export default EditShop;