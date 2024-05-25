import { Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBarTab = ({ textStyle, pressableStyle }) => {
    return(
        <>
            <Pressable style={pressableStyle}>
                    <Link to="/">
                        <Text style={textStyle}>Repositories</Text>
                    </Link>
            </Pressable>
            <Pressable style={pressableStyle}>
                <Link to="/signin">
                    <Text style={textStyle}>Sign in</Text>
                </Link>
            </Pressable>
        </>
    );
};

export default AppBarTab;