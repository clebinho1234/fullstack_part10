import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient , useMutation } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHENTICATE);
    const apolloClient = useApolloClient()
    const navigate = useNavigate();
  
    const signIn = async ({ username, password }) => {
        const { data } = await mutate({  variables: { credentials: { username, password } } })
        authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        navigate("/")
    };
  
    return [signIn, result];
};

export default useSignIn