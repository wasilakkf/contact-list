import * as React from 'react';

import {ContactCard} from '../ContactCard';
import styles from './ContactList.module.css';

export type ContactListItemDataType = Readonly<
  React.ComponentProps<typeof ContactCard> & {
    id: string;
  }
>;

type PropsType = Readonly<
  ContactListItemDataType & {
    onClick: (contactId: string) => unknown;
  }
>;

function ContactListItem({id, onClick, ...contactData}: PropsType) {
  const handleOnClick = React.useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <div className={styles.listItem} onClick={handleOnClick} data-testid="contact_list_item">
      <ContactCard {...contactData} />
    </div>
  );
}

export default React.memo<PropsType>(ContactListItem);
