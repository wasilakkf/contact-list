import * as React from 'react';

import ContactListItem, {ContactListItemDataType} from './ContactListItem';
import styles from './ContactList.module.css';

type PropsType = Readonly<{
  contacts: ReadonlyArray<ContactListItemDataType>;
  withContactOutline?: boolean;
  onContactClick: (contactId: string) => unknown;
}>;

export function ContactList({contacts, withContactOutline, onContactClick}: PropsType) {
  return (
    <div className={styles.list} data-testid="contact_list">
      {contacts.map((contact) => (
        <ContactListItem
          key={contact.id}
          withOutline={withContactOutline}
          onClick={onContactClick}
          {...contact}
        />
      ))}
    </div>
  );
}
