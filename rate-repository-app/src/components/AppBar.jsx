import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
    },
    text: {
        fontSize: 30,
        color: 'white',
    },
    pressable: {
        marginRight: 10,
    },
    scrollView: {
        flexDirection: 'row',
        marginBottom: 5,
        marginHorizontal: 20,
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scrollView}>
                <AppBarTab textStyle={styles.text} pressableStyle={styles.pressable}/>
            </ScrollView>
        </View>
    );
};

export default AppBar;