import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
    query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after: String) {
        repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
            edges {
                node {
                    ...RepositoryDetails
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
                startCursor
            }
        }
    }
    ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
    query($repositoryId: ID!, $first: Int, $after: String) {
        repository(id: $repositoryId) {
            ...RepositoryDetails
            url
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        id
                        user {
                        id
                        username
                        }
                        rating
                        text
                        createdAt
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    hasNextPage
                    startCursor
                }
            }
        }
    }
    ${REPOSITORY_DETAILS}
`

export const ME = gql`
    query getCurrentUser($includeReviews: Boolean = false){
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                  node {
                    id
                    rating
                    text
                    createdAt
                    repository {
                      id
                      fullName
                    }
                  }
                }
            }
        }
    }
`;