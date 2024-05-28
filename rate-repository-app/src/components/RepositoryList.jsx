import useRepositories from '../hooks/useRepositories';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
        
    return (
        <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item} />}
        />
    );
};

export default RepositoryList;