import * as React from 'react';

import {useContactList} from './useContactList';
import {FetchButton} from './FetchButton';
import {ContactListSection} from '../components';

import styles from './App.module.css';

const copy = {
  listWithOther: {
    title: 'Other contacts',
    emptyListInfo: "You don't have any other contacts",
    genericError: 'Error occured. Please try again later',
  },
  listWithSelected: {
    title: 'Selected contacts',
    emptyListInfo: 'No selected contacts',
    genericError: 'Error occured. Please try again later',
  },
};

export function App() {
  const {
    contacts,
    selectedContacts,
    isFetching,
    isFetchingMore,
    errorOnFetch,
    errorOnFetchMore,
    selectContact,
    deselectContact,
    refetch,
    fetchMore,
  } = useContactList();

  return (
    <main className={styles.container}>
      <div className={styles.listSection}>
        <ContactListSection
          copy={copy.listWithSelected}
          contacts={selectedContacts}
          showSpinner={isFetching}
          error={errorOnFetch}
          onContactClick={deselectContact}
        />
      </div>

      <div className={styles.listSection}>
        <ContactListSection
          copy={copy.listWithOther}
          contacts={contacts}
          showSpinner={isFetching}
          error={errorOnFetch}
          onContactClick={selectContact}
        />
      </div>

      {errorOnFetchMore && (
        <p className={styles.fetchMoreError} data-testid="error_on_fetch_more">
          {errorOnFetchMore}
        </p>
      )}

      {!isFetching && (
        <div className={styles.fetchButton}>
          <FetchButton
            isFetchingMore={isFetchingMore}
            errorOnFetch={errorOnFetch}
            errorOnFetchMore={errorOnFetchMore}
            refetch={refetch}
            fetchMore={fetchMore}
          />
        </div>
      )}
    </main>
  );
}
