import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    description
                    forksCount
                    fullName
                    language
                    ratingAverage
                    reviewCount
                    stargazersCount
                    ownerAvatarUrl
                    id
                }
            }
        }
    }
`;

export const ME = gql`
    query {
        me {
            id
            username
          }
    }
`;