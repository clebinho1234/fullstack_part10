import { Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBarTab = ({ textStyle, pressableStyle }) => {
    const authenticate = useQuery(ME);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient()

    if(authenticate.loading)
        return <p>...Loading</p>

    const handleSignOut = () => {
        authStorage.removeAccessToken();
        apolloClient.resetStore();
    };

    return(
        <>
            <Pressable style={pressableStyle}>
                    <Link to="/">
                        <Text style={textStyle}>Repositories</Text>
                    </Link>
            </Pressable>
            {authenticate.data.me && (
                <Pressable style={pressableStyle}>
                    <Link to="/create-review">
                        <Text style={textStyle}>Create a review</Text>
                    </Link>
                </Pressable>
            )}
            {authenticate.data.me && (
                <Pressable style={pressableStyle}>
                    <Link to="/user-review">
                        <Text style={textStyle}>My reviews</Text>
                    </Link>
                </Pressable>
            )}
            {!authenticate.data.me ? (
                <Pressable style={pressableStyle}>
                    <Link to="/signin">
                        <Text style={textStyle}>Sign in</Text>
                    </Link>
                </Pressable>
            ) : (
                <Pressable style={pressableStyle} onPress={handleSignOut}>
                    <Text style={textStyle}>Sign out</Text>
                </Pressable>
            )}
            {!authenticate.data.me && (
                <Pressable style={pressableStyle}>
                    <Link to="/signup">
                        <Text style={textStyle}>Sign up</Text>
                    </Link>
                </Pressable>
            )}
        </>
    );
};

export default AppBarTab;