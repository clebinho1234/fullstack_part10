import { Pressable, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import Text from '../Text';
import theme from '../../theme';
import { useParams } from 'react-router-native';
import { FlatList } from 'react-native-web';
import RepositoryReviews from './RepositoryReviews';
import useRepository from '../../hooks/useRepository';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
    },
    pressable: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
    },
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItemContainer = ({ item, showGitHub }) => {
    return(
        <View testID="repositoryItem" style={styles.container}>
            <TopContainer item={item}/>
            <BottomContainer item={item}/>
            {showGitHub && 
                <Pressable style={styles.pressable} onPress={() => Linking.openURL(item.url)}>
                    <Text style={styles.text}>Open in GithHub</Text>
                </Pressable>
            }
        </View>
    );
};

const RepositoryItem = ({ item, showGitHub = false }) => {
    const { id } = useParams();
    let repository, loading, error, fetchMore;

    if (showGitHub) {
        ({ repository, loading, error, fetchMore } = useRepository({ repositoryId: id }));
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    repository = repository ? repository : item;
    const reviews = repository.reviews
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={reviews}
            ListHeaderComponent={
                <RepositoryItemContainer 
                        item={repository}
                        showGitHub={showGitHub}
                />
            }
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => 
                    <RepositoryReviews item={item} />
            }
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default RepositoryItem;