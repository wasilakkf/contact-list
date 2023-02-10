import {useState, useMemo, useCallback} from 'react';

import {useFetchContacts} from '../useFetchContacts';

export function useContactList() {
  const {contacts: fetchedContacts, ...restOfFetchResult} = useFetchContacts();
  const [selectedContactsIds, setSelectedContactsIds] = useState<Set<string>>(new Set());

  const contacts = useMemo(
    () => (fetchedContacts ? fetchedContacts.filter(({id}) => !selectedContactsIds.has(id)) : null),
    [fetchedContacts, selectedContactsIds]
  );

  const selectedContacts = useMemo(
    () => (fetchedContacts ? fetchedContacts.filter(({id}) => selectedContactsIds.has(id)) : null),
    [fetchedContacts, selectedContactsIds]
  );

  const selectContact = useCallback((contactId: string) => {
    setSelectedContactsIds((prevSelectedIds) => {
      const nextSelectedIds = new Set(prevSelectedIds);

      nextSelectedIds.add(contactId);
      return nextSelectedIds;
    });
  }, []);

  const deselectContact = useCallback((contactId: string) => {
    setSelectedContactsIds((prevSelectedIds) => {
      const nextSelectedIds = new Set(prevSelectedIds);

      nextSelectedIds.delete(contactId);
      return nextSelectedIds;
    });
  }, []);

  return {
    contacts,
    selectedContacts,
    selectContact,
    deselectContact,
    ...restOfFetchResult,
  };
}
