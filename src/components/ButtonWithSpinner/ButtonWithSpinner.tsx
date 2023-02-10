import * as React from 'react';
import cn from 'classnames';

import {Spinner} from '../Spinner';
import styles from './ButtonWithSpinner.module.css';

type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Readonly<{
    children: React.ReactNode;
    showSpinner?: boolean;
  }>;

export function ButtonWithSpinner({children, showSpinner, className, ...buttonProps}: PropsType) {
  const buttonClasses = cn(styles.button, className);

  return (
    <button type="button" className={buttonClasses} {...buttonProps}>
      {showSpinner ? <Spinner size="s" color="white" dataTestId="button_spinner" /> : children}
    </button>
  );
}
