import * as React from 'react';

import ContactListItem, {ContactDataType} from './ContactListItem';
import styles from './ContactList.module.css';

type PropsType = Readonly<{
  copy: {
    title: string;
    emptyList: string;
  };
  contacts: ReadonlyArray<ContactDataType>;
  onContactClick: (contactId: string) => unknown;
}>;

export function ContactList({copy, contacts, onContactClick}: PropsType) {
  const isEmptyList = contacts.length === 0;

  const contactsNodes = React.useMemo(
    () => contacts.map((contact) => <ContactListItem key={contact.id} onClick={onContactClick} {...contact} />),
    [contacts, onContactClick]
  );

  return (
    <div data-testid="contact_list">
      <h2 className={styles.title}>{copy.title}</h2>

      {isEmptyList ? (
        <div className={styles.emptyListInfo} data-testid="contact_list_empty_info">
          <p>{copy.emptyList}</p>
        </div>
      ) : (
        <div className={styles.list}>{contactsNodes}</div>
      )}
    </div>
  );
}
