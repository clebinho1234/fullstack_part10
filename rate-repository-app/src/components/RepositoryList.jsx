import { FlatList, Pressable, Picker, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';

const RepositroyListHeader = ({ searchKeyword, setSearchKeyword, pickerLabel, setPickerLabel, setOrderBy, setOrderDirection }) => {
    return (
        <View>
             <Searchbar
                placeholder="Search"
                value={searchKeyword}
                onChangeText={setSearchKeyword}
            />
            <Picker
                selectedValue={pickerLabel}
                onValueChange={(itemValue) => {
                    switch(itemValue){
                        case 'CREATED_AT':
                            setPickerLabel('CREATED_AT');
                            setOrderBy('CREATED_AT');
                            setOrderDirection('DESC');
                            break;
                        case 'RATING_AVERAGE_DESC':
                            setPickerLabel('RATING_AVERAGE_DESC');
                            setOrderBy('RATING_AVERAGE');
                            setOrderDirection('DESC');
                            break;
                        case 'RATING_AVERAGE_ASC':
                            setPickerLabel('RATING_AVERAGE_ASC');
                            setOrderBy('RATING_AVERAGE');
                            setOrderDirection('ASC');
                            break;
                        default:
                            break;
                    }
                }}
            >
                <Picker.Item label="Latest repositories" value="CREATED_AT" />
                <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE_DESC" />
                <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
            </Picker>
        </View>
    );
};

export const RepositoryListContainer = ({ searchKeyword, setSearchKeyword, pickerLabel, setPickerLabel, repositories, navigate, setOrderBy, setOrderDirection, onEndReach }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
            <FlatList
                data={repositoryNodes}
                ListHeaderComponent={
                        <RepositroyListHeader
                            pickerLabel={pickerLabel}
                            setPickerLabel={setPickerLabel}
                            setOrderBy={setOrderBy} 
                            setOrderDirection={setOrderDirection}
                            searchKeyword={searchKeyword}
                            setSearchKeyword={setSearchKeyword}
                        />
                }
                renderItem={({item}) => 
                <Pressable onPress={() =>  navigate(`/${item.id}`)}>
                    <RepositoryItem item={item} />
                </Pressable>
                }
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
    );
};

const RepositoryList = () => {
    const [pickerLabel, setPickerLabel] = useState('CREATED_AT');
    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDirection] = useState('DESC');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

    const { repositories, loading, error, fetchMore } = useRepositories({ orderBy, orderDirection, searchKeyword: debouncedSearchKeyword, first: 8 });
    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const onEndReach = () => {
        fetchMore();
    };

    return <RepositoryListContainer 
                repositories={repositories} 
                navigate={navigate}
                pickerLabel={pickerLabel}
                setPickerLabel={setPickerLabel}
                setOrderBy={setOrderBy}
                setOrderDirection={setOrderDirection}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                onEndReach={onEndReach}
            />;
};

export default RepositoryList;