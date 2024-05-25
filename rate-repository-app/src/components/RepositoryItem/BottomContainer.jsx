import { StyleSheet, View } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    statItem: {
        alignItems: 'center',
    },
});

const formatThousands = (number) => {
    if (number >= 1000) {
        const formattedNumber = (number / 1000).toFixed(1).replace('.0','');
        return formattedNumber + 'k';
    }
    return number.toString();
};

const BottomContainer = ({ item }) => {
    return(
        <View style={styles.bottomContainer}>
            <View style={styles.statItem}>
                <Text fontWeight='bold'>{formatThousands(item.stargazersCount)}</Text>
                <Text >Stars</Text>
            </View>
            <View style={styles.statItem}>
                <Text fontWeight='bold'>{formatThousands(item.forksCount)}</Text>
                <Text color='textSecondary'>Forks</Text>
            </View>
            <View style={styles.statItem}>
                <Text fontWeight='bold'>{formatThousands(item.reviewCount)}</Text>
                <Text color='textSecondary'>Reviews</Text>
            </View>
            <View style={styles.statItem}>
                <Text fontWeight='bold'>{formatThousands(item.ratingAverage)}</Text>
                <Text color='textSecondary'>Rating</Text>
            </View>
        </View>
    );
};

export default BottomContainer