import * as React from 'react';

import {ButtonWithSpinner} from '../../components';
import styles from './FetchButton.module.css';

const copy = {
  buttonRefetch: 'Refetch',
  buttonFetchMore: 'Load more',
};

type PropsType = Readonly<{
  isFetchingMore?: boolean;
  errorOnFetch?: string | null;
  errorOnFetchMore?: string | null;
  refetch: () => unknown;
  fetchMore: () => unknown;
}>;

export function FetchButton({isFetchingMore, errorOnFetch, errorOnFetchMore, refetch, fetchMore}: PropsType) {
  if (errorOnFetchMore) {
    return (
      <div className={styles.buttonContainer}>
        <ButtonWithSpinner className={styles.button} data-testid="fetch_button_refetch_more" onClick={fetchMore}>
          {copy.buttonRefetch}
        </ButtonWithSpinner>
      </div>
    );
  }

  if (errorOnFetch) {
    return (
      <div className={styles.buttonContainer}>
        <ButtonWithSpinner className={styles.button} data-testid="fetch_button_refetch" onClick={refetch}>
          {copy.buttonRefetch}
        </ButtonWithSpinner>
      </div>
    );
  }

  return (
    <div className={styles.buttonContainer}>
      <ButtonWithSpinner
        className={styles.button}
        showSpinner={isFetchingMore}
        data-testid="fetch_button_fetch_more"
        onClick={fetchMore}
      >
        {copy.buttonFetchMore}
      </ButtonWithSpinner>
    </div>
  );
}
