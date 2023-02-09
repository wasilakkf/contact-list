import * as React from 'react';

import {getInitials} from './getInitials';
import styles from './ContactCard.module.css';

type PropsType = Readonly<{
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
}>;

export function ContactCard({firstNameLastName, jobTitle, emailAddress}: PropsType) {
  return (
    <div className={styles.card} data-testid="contact_card">
      <div className={styles.baseInfoSection}>
        <div className={styles.initialsContainer}>
          <p data-testid="contact_card_initials">{getInitials(firstNameLastName)}</p>
        </div>

        <div className={styles.nameContainer}>
          <p className={styles.fullName}>{firstNameLastName}</p>
          <p className={styles.jobTitle}>{jobTitle}</p>
        </div>
      </div>

      <div className={styles.emailSection}>
        <p className={styles.email} data-testid="contact_card_email">
          {emailAddress}
        </p>
      </div>
    </div>
  );
}
