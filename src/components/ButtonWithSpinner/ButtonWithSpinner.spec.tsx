import {render, screen} from '@testing-library/react';

import {ButtonWithSpinner} from './ButtonWithSpinner';

describe('<ButtonWithSpinner />', () => {
  it('renders button with children', () => {
    render(<ButtonWithSpinner>Hello</ButtonWithSpinner>);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('Hello')).toBeInTheDocument();
  });

  it('renders button with spinner if "showSpinner" prop is set', () => {
    render(<ButtonWithSpinner showSpinner>Hello</ButtonWithSpinner>);

    expect(screen.queryByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    expect(screen.queryByTestId('button_spinner')).toBeInTheDocument();
  });
});
