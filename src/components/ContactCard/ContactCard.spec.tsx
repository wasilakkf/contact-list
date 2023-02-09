import {render, screen} from '@testing-library/react';

import {ContactCard} from './ContactCard';

const defaultTestProps = {
  firstNameLastName: 'Jon Doe',
  jobTitle: 'Driver',
  emailAddress: 'jon.doe@example.com',
};

describe('<ContactCard />', () => {
  it('renders without errors', () => {
    render(<ContactCard {...defaultTestProps} />);

    expect(screen.queryByTestId('contact_card')).toBeInTheDocument();

    expect(screen.queryByText('Jon Doe')).toBeInTheDocument();
    expect(screen.queryByText('Driver')).toBeInTheDocument();
    expect(screen.queryByText('jon.doe@example.com')).toBeInTheDocument();
  });

  it('properly displays initials', () => {
    render(<ContactCard {...defaultTestProps} />);

    expect(screen.getByTestId('contact_card_initials').textContent).toEqual('JD');
  });
});
