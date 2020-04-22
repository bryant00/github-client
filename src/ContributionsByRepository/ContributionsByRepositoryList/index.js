import React, { Fragment } from 'react';

import FetchMore from '../../FetchMore';
import ContributionsByRepositoryItem from '../ContributionsByRepositoryItem';
import Issues from '../../Issue';

import '../style.css';

const getUpdateQuery = (entry) => (
  previousResult,
  { fetchMoreResult },
) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  };
};

const ContributionsByRepositoryList = ({
  contributionsCollection,
  loading,
  fetchMore,
  entry,
}) => (
  <Fragment>
    {contributionsCollection.commitContributionsByRepository.map(
      ({ repository }) => (
        <div
          key={repository.name}
          className="ContributionsByRepositoryItem"
        >
          <ContributionsByRepositoryItem {...repository} />
        </div>
      ),
    )}
  </Fragment>
);

export default ContributionsByRepositoryList;
