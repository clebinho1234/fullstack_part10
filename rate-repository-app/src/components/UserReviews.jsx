import { useMutation, useQuery } from '@apollo/client';
import { View, FlatList, StyleSheet, Alert, Pressable } from 'react-native';
import theme from '../theme';
import { format } from 'date-fns';
import { ME } from '../graphql/queries';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
      },
    separator: {
        height: 10,
    },
});

const UserReviewsTopContainer = ({ item }) => {
    const formattedDate = format(new Date(item.createdAt), 'dd.MM.yyyy');
    return(
        <View style={styles.container}>
            <View style={styles.image}>
                <Text color="primary" fontWeight="bold">{item.rating}</Text>
            </View>
            <View style={styles.content}>
                <Text fontWeight='bold'>{item.repository.fullName}</Text>
                <Text color="textSecondary">{formattedDate}</Text>
                <Text fontSize="subheading">{item.text}</Text>
            </View>
        </View>
    );
};

const UserReviewsBottomContainer = ({ handleDeleteReview, handleViewRepository }) => {
    return(
        <View>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, {backgroundColor: 'blue'}]} onPress={handleViewRepository}>
                    <Text style={{color: 'white'}} fontWeight='bold'>View Repository</Text>
                </Pressable>
                <Pressable style={[styles.button, {backgroundColor: 'red'}]} onPress={handleDeleteReview}>
                    <Text style={{color: 'white'}} fontWeight='bold'>Delete Review</Text>
                </Pressable>
            </View>
        </View>
    );
};

const UserReviewsContainer = ({ item, refetch }) => {
    const [deleteReview] = useMutation(DELETE_REVIEW);
    const navigate = useNavigate();

    const handleViewRepository = () => {
        navigate(`/${item.repository.id}`);
    };

    const handleDeleteReview = () => {
        Alert.alert(
        'Delete Review',
        'Are you sure you want to delete this review?',
        [
            {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
            },
            {
            text: 'OK',
            onPress: async () => {
                try {
                    await deleteReview({ variables: { id: item.id } });
                    refetch();
                } catch (e) {
                    console.error(e);
                }
            },
            },
        ],
        { cancelable: false }
        );
    };

    return(
        <View style={{ backgroundColor: 'white', paddingBottom: 10 }}>
            <UserReviewsTopContainer item={item} />
            <UserReviewsBottomContainer handleDeleteReview={handleDeleteReview} handleViewRepository={handleViewRepository} />
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
    const { data, loading, error, refetch } = useQuery(ME, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const reviews = data.me.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (<UserReviewsContainer item={item} refetch={refetch} />)}
    />
  );
};

export default UserReviews;
