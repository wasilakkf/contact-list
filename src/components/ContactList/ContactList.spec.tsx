import {render, screen, fireEvent} from '@testing-library/react';

import {ContactList} from './ContactList';

const defaultTestProps = {
  contacts: [
    {
      id: '1',
      jobTitle: 'Fabricator',
      emailAddress: 'Ron_Giles3711@dionrab.com',
      firstNameLastName: 'Ron Giles',
    },
    {
      id: '2',
      jobTitle: 'IT Support Staff',
      emailAddress: 'Melinda_Mcgregor7556@mafthy.com',
      firstNameLastName: 'Melinda Mcgregor',
    },
    {
      id: '3',
      jobTitle: 'Call Center Representative',
      emailAddress: 'Wade_Steer2239@cispeto.com',
      firstNameLastName: 'Wade Steer',
    },
  ],
  onContactClick: jest.fn(),
};

describe('<ContactList />', () => {
  beforeEach(jest.clearAllMocks);

  it('renders without errors', () => {
    render(<ContactList {...defaultTestProps} />);

    expect(screen.queryByTestId('contact_list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('contact_list_item')).toHaveLength(3);
  });

  it('invokes callback on list item click', () => {
    render(<ContactList {...defaultTestProps} />);

    fireEvent.click(screen.getAllByTestId('contact_list_item')[1]);

    expect(defaultTestProps.onContactClick).toHaveBeenCalledTimes(1);
    expect(defaultTestProps.onContactClick).toHaveBeenCalledWith('2');
  });
});
