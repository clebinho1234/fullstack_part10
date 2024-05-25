import { StyleSheet, View } from 'react-native';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
});

const RepositoryItem = ({ item }) => {
    return(
        <View style={styles.container}>
            <TopContainer item={item}/>
            <BottomContainer item={item}/>
        </View>
    )
};

export default RepositoryItem;