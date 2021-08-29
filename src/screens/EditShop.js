import Layout from "../components/Layout";
import Subtitle from "../components/Subtitle";
import Notification from "../components/Notification";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import Loading from "../components/auth/Loading";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, gql } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useParams, useHistory } from 'react-router-dom';

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
    // console.log(shopData);

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
    // console.log(shopData);
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
                message: "Coffeeshop deleted.",
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
        <Layout>
            <PageTitle title="Sign up" />
            <FormBox>
                <Subtitle>Edit CoffeeShop</Subtitle>
                <Notification message={errors?.result?.message} />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    {shopLoading ?
                        <Loading />
                        : <>
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
                                type="button"
                                value={loading ? "Loading..." : "Delete"}
                                onClick={deleteShop}
                                disabled={loading}
                            />
                        </>}
                </form>
            </FormBox>
        </Layout>
    );
}

export default EditShop;