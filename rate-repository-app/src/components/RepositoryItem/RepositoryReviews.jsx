import { View, StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import { format } from 'date-fns';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    content: {
        flexGrow: 2,
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25, //width / 2
        marginRight: theme.margin.marginRight,
        flexGrow: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.primary
    },
});

const RepositoryReviews = ({ item }) => {
    const formattedDate = format(new Date(item.createdAt), 'dd.MM.yyyy');

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Text color="primary" fontWeight="bold">{item.rating}</Text>
            </View>
            <View style={styles.content}>
                <Text fontWeight='bold'>{item.user.username}</Text>
                <Text color="textSecondary">{formattedDate}</Text>
                <Text fontSize="subheading">{item.text}</Text>
            </View>
        </View>
    )
};

export default RepositoryReviews