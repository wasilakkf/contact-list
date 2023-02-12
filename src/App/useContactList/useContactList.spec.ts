import {renderHook, act} from '@testing-library/react-hooks';

import {useFetchContacts} from '../useFetchContacts';
import {useContactList} from './useContactList';

jest.mock('../useFetchContacts', () => ({
  useFetchContacts: jest.fn(),
}));

const mockedHookResult = {
  contacts: [
    {
      id: '1',
      firstNameLastName: 'Jon Doe',
      jobTitle: 'Programmer',
      emailAddress: 'abc@example.com',
    },
    {
      id: '2',
      firstNameLastName: 'Han Solo',
      jobTitle: 'Smuggler',
      emailAddress: 'han@tatooine.com',
    },
    {id: '3', firstNameLastName: 'Tim Tam', jobTitle: 'Dealer', emailAddress: 'xyz@gmail.com'},
    {id: '4', firstNameLastName: 'Ben Doe', jobTitle: 'CEO', emailAddress: 'ben@abc.com'},
  ],
};

describe('useContactList()', () => {
  const mockedFetchHook = useFetchContacts as jest.Mock;

  beforeEach(jest.clearAllMocks);

  it('returns fetched contacts', () => {
    mockedFetchHook.mockReturnValue(mockedHookResult);

    const {result} = renderHook(() => useContactList());

    expect(result.current.contacts).toHaveLength(4);
    expect(result.current.selectedContacts).toHaveLength(0);
  });

  it('properly selects and deselects specified contact', () => {
    mockedFetchHook.mockReturnValue(mockedHookResult);

    const {result} = renderHook(() => useContactList());

    act(() => {
      result.current.selectContact('3');
    });

    expect(result.current.contacts).toHaveLength(3);
    expect(result.current.selectedContacts).toHaveLength(1);
    expect(result.current.selectedContacts?.[0].id).toEqual('3');

    act(() => {
      result.current.deselectContact('3');
    });

    expect(result.current.contacts).toHaveLength(4);
    expect(result.current.selectedContacts).toHaveLength(0);
  });
});
