import {useEffect, useCallback} from 'react';

import {fetchContactsData} from '../../api';
import {useFetchContactsState} from './useFetchContactsState';

export function useFetchContacts() {
  const [{contacts, error, ...restOfState}, dispatch] = useFetchContactsState();

  const performFetch = useCallback(async () => {
    dispatch({type: 'clear-error'});

    try {
      const contacts = await fetchContactsData();

      dispatch({type: 'add-contacts', payload: {contacts}});
    } catch (error) {
      dispatch({type: 'set-error', payload: {error: 'Error fetching contacts.'}});
    }
  }, [dispatch]);

  const fetchMore = useCallback(async () => {
    dispatch({type: 'start-fetching-more'});

    await performFetch();

    dispatch({type: 'stop-fetching-more'});
  }, [dispatch, performFetch]);

  const refetch = useCallback(async () => {
    dispatch({type: 'start-fetching'});

    await performFetch();

    dispatch({type: 'stop-fetching'});
  }, [dispatch, performFetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    refetch,
    fetchMore,
    contacts,
    errorOnFetch: !contacts ? error : null,
    errorOnFetchMore: contacts ? error : null,
    ...restOfState,
  };
}
