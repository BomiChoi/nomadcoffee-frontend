import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { useLocation, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar"
import Subtitle from "../components/Subtitle";
import Notification from "../components/Notification";
import Loading from "../components/auth/Loading";
import useUser from "../hooks/useUser";

const ShopContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Shop = styled(Link)`
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.borderColor};
    color: ${props => props.theme.fontColor};
    margin: 10px;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    max-width: 615px;
    h3{
        font-size: 27px;
        color: ${props => props.theme.accent};
        font-weight: bold;
        font-family: 'Nanum Pen Script', cursive;
    }
`;
const Add = styled(Shop)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;
const ShopHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;
const PhotoFile = styled.img`
  width: 100%;
`;
const Row = styled.div`
    margin-bottom: 10px;
`;
const Username = styled.span`
  margin-left: 15px;
`;
const CategoryContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const Category = styled.span`
    color: ${props => props.theme.accent};
    font-weight: bold;
    margin: 0 5px;
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
                user{
                    username
                    avatarURL
                }
                photos{
                    url
                }
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
                    {isLoggedIn &&
                        <Add to={`/add`}>
                            <h3>+ Add Shop</h3>
                        </Add>
                    }
                    {data?.seeProfile?.shops?.map(shop =>
                        <Shop to={`/shop/${shop.id}`} key={shop.id}>
                            <ShopHeader>
                                <Avatar lg url={shop.user.avatarURL} />
                                <Username>{shop.user.username}</Username>
                            </ShopHeader>
                            <Row>
                                {shop.photos?.map(photo =>
                                    <PhotoFile src={photo.url} />
                                )}
                            </Row>
                            <Row><h3>{shop.name}</h3></Row>
                            <Row>Location: {shop.latitude}, {shop.longitude}</Row>
                            <Row>
                                <CategoryContainer>
                                    {shop.categories?.map(category =>
                                        <Category key={category.name}>{category.name}</Category>
                                    )}
                                </CategoryContainer>
                            </Row>
                        </Shop>
                    )}
                </ShopContainer>
            }
        </Layout>
    );
}

export default Home;