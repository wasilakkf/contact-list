import * as React from 'react';

import {Spinner} from '../Spinner';
import ContactListItem, {ContactDataType} from './ContactListItem';
import styles from './ContactList.module.css';

type PropsType = Readonly<{
  copy: {
    title: string;
    emptyList: string;
  };
  contacts: ReadonlyArray<ContactDataType>;
  showSpinner?: boolean;
  onContactClick: (contactId: string) => unknown;
}>;

export function ContactList({copy, contacts, showSpinner, onContactClick}: PropsType) {
  const isEmptyList = contacts.length === 0;

  const contactListContent = React.useMemo(() => {
    if (showSpinner) {
      return (
        <div className={styles.contentBox}>
          <Spinner dataTestId="contact_list_spinner" />
        </div>
      );
    }

    if (isEmptyList) {
      return (
        <div className={styles.contentBox}>
          <p className={styles.emptyInfo} data-testid="contact_list_empty_info">
            {copy.emptyList}
          </p>
        </div>
      );
    }

    return (
      <div className={styles.list}>
        {contacts.map((contact) => (
          <ContactListItem key={contact.id} onClick={onContactClick} {...contact} />
        ))}
      </div>
    );
  }, [showSpinner, isEmptyList, copy.emptyList, contacts, onContactClick]);

  return (
    <div data-testid="contact_list">
      <h2 className={styles.title}>{copy.title}</h2>

      {contactListContent}
    </div>
  );
}
