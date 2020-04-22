import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ContributionsByRepositoryList, {
  REPOSITORY_FRAGMENT,
} from '../ContributionsByRepository';
import Loading from '../Loading';
import ErrorMessage from '../Error';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

const GET_CONTRIBUTIONS = gql`
  query {
    viewer {
      login
      contributionsCollection {
        startedAt
        endedAt
        totalCommitContributions
        commitContributionsByRepository {
          repository {
            name
            url
            isFork
            descriptionHTML
          }
          contributions(
            first: 1
            orderBy: { field: OCCURRED_AT, direction: DESC }
          ) {
            nodes {
              occurredAt
              commitCount
            }
          }
        }
      }
    }
  }
`;
const Contributions = () => (
  <Query query={GET_CONTRIBUTIONS} notifyOnNetworkStatusChange={true}>
    {({ data, loading, error, fetchMore }) => {
      const { viewer } = data;

      if (loading && !viewer) {
        return <Loading isCenter={true} />;
      }

      if (error) {
        return <ErrorMessage error={error} />;
      }

      return (
        <>
          <div>
            <div className="ContributionsByRepositoryItem-title">
              <h2>
                {
                  viewer.contributionsCollection
                    .totalCommitContributions
                }
              </h2>

              <div></div>
            </div>

            <div className="ContributionsByRepositoryItem-description">
              <div className="ContributionsByRepositoryItem-description-details">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <ContributionsByRepositoryList
            loading={loading}
            contributionsCollection={viewer.contributionsCollection}
            fetchMore={fetchMore}
            entry={'viewer'}
          />
        </>
      );
    }}
  </Query>
);

export default Contributions;
