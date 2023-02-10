import {render, screen, fireEvent} from '@testing-library/react';

import {ContactListSection} from './ContactListSection';

const defaultTestProps = {
  copy: {
    title: 'Contacts Title',
    emptyListInfo: 'No contacts',
  },
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
  ],
  onContactClick: jest.fn(),
};

describe('<ContactListSection />', () => {
  beforeEach(jest.clearAllMocks);

  it('renders contacts list', () => {
    render(<ContactListSection {...defaultTestProps} />);

    expect(screen.queryByTestId('contact_list_section')).toBeInTheDocument();
    expect(screen.queryByTestId('contact_list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('contact_list_item')).toHaveLength(2);
    expect(screen.queryByText('Contacts Title')).toBeInTheDocument();
  });

  it('renders spinner if "showSpinner" prop is set', () => {
    render(<ContactListSection {...defaultTestProps} showSpinner />);

    expect(screen.queryByTestId('contact_list_section_spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('contact_list')).not.toBeInTheDocument();
  });

  it('renders error if "error" prop is set', () => {
    render(<ContactListSection {...defaultTestProps} error="Some error" />);

    expect(screen.queryByTestId('contact_list_section_error')).toBeInTheDocument();
    expect(screen.queryByText('Some error')).toBeInTheDocument();
    expect(screen.queryByTestId('contact_list')).not.toBeInTheDocument();
  });

  it('renders empty info if contacts list is empty', () => {
    render(<ContactListSection {...defaultTestProps} contacts={[]} />);

    expect(screen.queryByTestId('contact_list_section_empty_info')).toBeInTheDocument();
    expect(screen.queryByText('No contacts')).toBeInTheDocument();
    expect(screen.queryByTestId('contact_list')).not.toBeInTheDocument();
  });

  it('invokes callback on list item click', () => {
    render(<ContactListSection {...defaultTestProps} />);

    fireEvent.click(screen.getAllByTestId('contact_list_item')[1]);

    expect(defaultTestProps.onContactClick).toHaveBeenCalledTimes(1);
    expect(defaultTestProps.onContactClick).toHaveBeenCalledWith('2');
  });
});
