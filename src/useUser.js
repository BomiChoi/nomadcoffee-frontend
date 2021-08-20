import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "./apollo";

const ME_QUERY = gql`
query me{
    me{
        username
        avatar
    }
}
`;

function useUser() {
    const hasToken = useReactiveVar(isLoggedInVar);
    const { data, loading, error } = useQuery(ME_QUERY, {
        skip: !hasToken
    });
    useEffect(() => {
        if (data?.me === null) {
            logUserOut();
        }
    }, [data])
    if (!loading) {
        console.log(data, error);
    }
    return data;
}

export default useUser;