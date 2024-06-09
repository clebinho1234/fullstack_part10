import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ repositoryId, first = 2 }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId, first },
    fetchPolicy: 'cache-and-network',
  });

  const repository = data ? data.repository : null;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        repositoryId,
        after: data.repository.reviews.pageInfo.endCursor,
        first
      },
    });
  };

  return { repository, loading, error, fetchMore: handleFetchMore };
};

export default useRepository;