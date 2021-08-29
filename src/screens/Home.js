import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { useLocation, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Subtitle from "../components/Subtitle";
import Notification from "../components/Notification";
import Loading from "../components/auth/Loading";
import useUser from "../useUser";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
`;

const AddShop = styled(Link)`
    border: 1px solid ${props => props.theme.accent};
    border-radius: 5px;
    padding: 5px;
    color: ${props => props.theme.fontColor};
    margin: 5px;
    font-weight: bold;
`;
const ShopContainer = styled.div`
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 10px;
`;
const Shop = styled(Link)`
    border: 1px solid ${props => props.theme.borderColor};
    color: ${props => props.theme.fontColor};
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    h3{
        color: ${props => props.theme.fontColor};
        font-size: 20px;
        color: ${props => props.theme.accent};
        font-weight: bold;
    }
    div {
        margin: 5px;
    }
`;
const Category = styled.span`
    color: ${props => props.theme.accent};
    font-weight: bold;
`;

const PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username){
            shops{
                id
                name
                latitude
                longitude
                categories{name}
            }
        }
    }
`;

function Home() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const location = useLocation();
    const { data: user, loading: userLoading } = useUser();
    let username = ""
    if (!userLoading) {
        // console.log(user.me.username);
        username = user.me.username;
    }
    const { data, loading } = useQuery(PROFILE_QUERY, {
        variables: { username }
    })
    return (
        <Layout>
            <Subtitle>Welcome!</Subtitle>
            <Notification type="ok" message={location?.state?.message} />
            {(userLoading || loading) ?
                <Loading />
                : <ShopContainer>
                    {data?.seeProfile?.shops?.map(shop =>
                        <Shop to={`/shop/${shop.id}`} key={shop.id}>
                            <h3>{shop.name}</h3>
                            <div>Location: {shop.latitude}, {shop.longitude}</div>
                            <div>
                                {shop.categories?.map(category =>
                                    <Category key={category.id}>{category.name} </Category>
                                )}
                            </div>
                        </Shop>
                    )}
                    {isLoggedIn &&
                        <Shop to={`/add`}>
                            <h3>+ Add Shop</h3>
                        </Shop>
                    }
                </ShopContainer>
            }
        </Layout>
    );
}

export default Home;