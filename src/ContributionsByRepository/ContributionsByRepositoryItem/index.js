import React from 'react';
import { Mutation } from 'react-apollo';

import REPOSITORY_FRAGMENT from '../fragments';
import Link from '../../Link';
import Button from '../../Button';

import '../style.css';

const ContributionsByRepositoryItem = ({
  name,
  url,
  isFork,
  descriptionHTML,
}) => (
  <div>
    <div className="ContributionsByRepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>

      <div></div>
    </div>

    <div className="ContributionsByRepositoryItem-description">
      <div
        className="ContributionsByRepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="ContributionsByRepositoryItem-description-details">
        <div></div>
        <div>
          {name && (
            <span>
              Owner: <a href={url}>{name}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ContributionsByRepositoryItem;
