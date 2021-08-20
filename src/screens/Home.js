import styled from "styled-components";
import { isLoggedInVar, logUserOut, darkModeVar } from "..//apollo";
import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import useUser from "../useUser";
import AuthLayout from "../components/auth/AuthLayout";

const Title = styled.h1`
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.accent};
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
`;
const LogoutBtn = styled.button`
    background: none;
    border: 1px solid ${props => props.theme.accent};
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    font-weight: bold;
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
    span {
        color: ${props => props.theme.accent};
        font-weight: bold;
    }
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
    const darkMode = useReactiveVar(darkModeVar);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const history = useHistory();
    const username = "hibomi97";
    const { data } = useQuery(PROFILE_QUERY, {
        variables: { username }
    })
    return (
        <AuthLayout>
            <Title>Welcome!</Title>
            <ButtonContainer>
                <LogoutBtn onClick={() => logUserOut(history)}>Log out now!</LogoutBtn>
                {isLoggedIn && <AddShop to="/add">Add Coffeeshop</AddShop>}
            </ButtonContainer>
            <ShopContainer>
                {data?.seeProfile?.shops?.map(shop =>
                    <Shop to={`/shop/${shop.id}`} >
                        <h3>{shop.name}</h3>
                        <div>Location: {shop.latitude}, {shop.longitude}</div>
                        <div>
                            {shop.categories?.map(category =>
                                <span>{category.name} </span>
                            )}
                        </div>
                    </Shop>)
                }
            </ShopContainer>
        </AuthLayout>
    );
}

export default Home;