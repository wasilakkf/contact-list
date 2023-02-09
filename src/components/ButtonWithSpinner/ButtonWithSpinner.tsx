import * as React from 'react';

import {Spinner} from '../Spinner';
import styles from './ButtonWithSpinner.module.css';

type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Readonly<{
    children: React.ReactNode;
    showSpinner?: boolean;
  }>;

export function ButtonWithSpinner({children, showSpinner, ...buttonProps}: PropsType) {
  return (
    <button type="button" className={styles.button} {...buttonProps}>
      {showSpinner ? <Spinner size="s" color="white" dataTestId="button_spinner" /> : children}
    </button>
  );
}
