import * as React from 'react';

import {ContactList, ContactListItemDataType} from '../ContactList';
import {Spinner} from '../Spinner';
import styles from './ContactListSection.module.css';

type PropsType = Readonly<{
  copy: {
    title: string;
    emptyListInfo: string;
    genericError: string;
  };
  contacts?: ReadonlyArray<ContactListItemDataType> | null;
  showSpinner?: boolean;
  error?: string | null;
  withContactOutline?: boolean;
  onContactClick: (contactId: string) => unknown;
}>;

export function ContactListSection({
  copy,
  contacts,
  showSpinner,
  error,
  withContactOutline,
  onContactClick,
}: PropsType) {
  const sectionContent = React.useMemo(() => {
    if (showSpinner) {
      return (
        <div className={styles.centeredContent}>
          <Spinner dataTestId="contact_list_section_spinner" />
        </div>
      );
    }

    if (error || !contacts) {
      return (
        <div className={styles.centeredContent} data-testid="contact_list_section_error">
          <p className={styles.errorText}>{error ?? copy.genericError}</p>
        </div>
      );
    }

    if (contacts.length === 0) {
      return (
        <div className={styles.centeredContent} data-testid="contact_list_section_empty_info">
          <p className={styles.infoText}>{copy.emptyListInfo}</p>
        </div>
      );
    }

    return <ContactList contacts={contacts} withContactOutline={withContactOutline} onContactClick={onContactClick} />;
  }, [showSpinner, error, contacts, withContactOutline, onContactClick, copy]);

  return (
    <section className={styles.container} data-testid="contact_list_section">
      <h2 className={styles.title}>{copy.title}</h2>

      {sectionContent}
    </section>
  );
}
