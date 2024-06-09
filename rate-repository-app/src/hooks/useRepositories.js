import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword, first = 2 }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { orderDirection, orderBy, searchKeyword, first },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data ? data.repositories : null;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy, 
        orderDirection, 
        searchKeyword,
        first
      },
    });
  };

  return { repositories, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;