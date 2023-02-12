import * as React from 'react';
import cn from 'classnames';

import {ContactCard} from '../ContactCard';
import styles from './ContactList.module.css';

export type ContactListItemDataType = Readonly<
  React.ComponentProps<typeof ContactCard> & {
    id: string;
  }
>;

type PropsType = Readonly<
  ContactListItemDataType & {
    withOutline?: boolean;
    onClick: (contactId: string) => unknown;
  }
>;

function ContactListItem({id, onClick, withOutline, ...contactData}: PropsType) {
  const listItemClasses = cn(styles.listItem, {
    [styles.listItemOutline]: withOutline,
  });

  const handleOnClick = React.useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <div className={listItemClasses} onClick={handleOnClick} data-testid="contact_list_item">
      <ContactCard {...contactData} />
    </div>
  );
}

export default React.memo<PropsType>(ContactListItem);
