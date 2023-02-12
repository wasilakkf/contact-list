import * as React from 'react';
import cn from 'classnames';

import styles from './Spinner.module.css';

type PropsType = Readonly<{
  size?: 's' | 'm';
  color?: 'black' | 'white';
  dataTestId?: string;
}>;

export function Spinner({size = 'm', color = 'black', dataTestId}: PropsType) {
  const spinnerSizeClassName = `spinnerSize-${size}`;
  const spinnerColorClassName = `spinnerColor-${color}`;
  const spinnerClasses = cn(
    styles.spinner,
    styles[spinnerSizeClassName],
    styles[spinnerColorClassName]
  );

  return <div className={spinnerClasses} data-testid={dataTestId} />;
}
