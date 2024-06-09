import React from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // Para matchers adicionais do React Native Testing Library
import { RepositoryListContainer } from '../components/RepositoryList';
import { useNavigate } from 'react-router-dom';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      const navigate = useNavigate();

      const { getByText, getAllByText } = render(
        <RepositoryListContainer repositories={repositories} navigate={navigate} />
      );

      expect(getByText('jaredpalmer/formik')).toBeTruthy();
      expect(getByText('Build forms in React, without the tears')).toBeTruthy();
      expect(getByText('TypeScript')).toBeTruthy();
      expect(getByText('1.6k')).toBeTruthy(); 
      expect(getByText('21.9k')).toBeTruthy(); 
      expect(getByText('88')).toBeTruthy(); 

      expect(getByText('async-library/react-async')).toBeTruthy();
      expect(getByText('Flexible promise-based React data loader')).toBeTruthy();
      expect(getByText('JavaScript')).toBeTruthy();
      expect(getByText('69')).toBeTruthy();
      expect(getByText('1.8k')).toBeTruthy();
      expect(getByText('72')).toBeTruthy();
      const reviewCounts = getAllByText('3');
      expect(reviewCounts.length).toBe(2);
    });
  });
});
