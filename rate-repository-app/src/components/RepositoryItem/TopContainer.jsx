import { StyleSheet, View, Image } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: theme.margin.marginRight,
        flexGrow: 0,
    },
    content: {
        flexGrow: 2,
        flex: 1,
    },
    languageContainer: {
        backgroundColor: theme.colors.primary,
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
});

const TopContainer = ({ item }) => {
    return(
        <View style={styles.topContainer}>
            <Image
                style={styles.image}
                source={{ uri: item.ownerAvatarUrl }}
            />
            <View style={styles.content}>
                <Text fontWeight='bold' margin='bottom'>{item.fullName}</Text>
                <Text color='textSecondary' margin='bottom'>{item.description}</Text>
                <View style={styles.languageContainer}>
                    <Text style={{ color: 'white' }} fontWeight='bold' margin='bottom'>{item.language}</Text>
                </View>
            </View>
        </View>
    );
};

export default TopContainer;