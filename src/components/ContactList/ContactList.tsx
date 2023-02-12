import * as React from 'react';

import ContactListItem, {ContactListItemDataType} from './ContactListItem';
import styles from './ContactList.module.css';

type PropsType = Readonly<{
  contacts: ReadonlyArray<ContactListItemDataType>;
  onContactClick: (contactId: string) => unknown;
}>;

export function ContactList({contacts, onContactClick}: PropsType) {
  return (
    <div className={styles.list} data-testid="contact_list">
      {contacts.map((contact) => (
        <ContactListItem key={contact.id} onClick={onContactClick} {...contact} />
      ))}
    </div>
  );
}
