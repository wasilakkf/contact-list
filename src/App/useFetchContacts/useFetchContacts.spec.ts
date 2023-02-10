import {renderHook, act} from '@testing-library/react-hooks';

import {fetchContactsData} from '../../api';
import {useFetchContacts} from './useFetchContacts';

jest.mock('../../api', () => ({
  fetchContactsData: jest.fn(),
}));

const mockedResponseSuccess = Promise.resolve([
  {id: '1', firstNameLastName: 'Jon Doe', jobTitle: 'Programmer', emailAddress: 'abc@example.com'},
  {id: '2', firstNameLastName: 'Han Solo', jobTitle: 'Smuggler', emailAddress: 'han@tatooine.com'},
]);

const mockedResponseMore = Promise.resolve([
  {id: '3', firstNameLastName: 'Tim Tam', jobTitle: 'Dealer', emailAddress: 'xyz@gmail.com'},
  {id: '4', firstNameLastName: 'Ben Doe', jobTitle: 'CEO', emailAddress: 'ben@abc.com'},
]);

describe('useFetchContacts()', () => {
  const mockedFetch = fetchContactsData as jest.Mock;

  beforeEach(jest.clearAllMocks);

  it('fetches list of contacts', async () => {
    mockedFetch.mockReturnValueOnce(mockedResponseSuccess);

    const {result, waitFor} = renderHook(() => useFetchContacts());

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.contacts).toHaveLength(2));

    expect(result.current.isFetching).toBe(false);
    expect(result.current.errorOnFetch).toBeNull();
  });

  it('returns error if fetch request fails', async () => {
    mockedFetch.mockReturnValueOnce(Promise.reject());

    const {result, waitFor} = renderHook(() => useFetchContacts());

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.errorOnFetch).toBeTruthy());

    expect(result.current.isFetching).toBe(false);
    expect(result.current.contacts).toBeNull();
  });

  it('refetches data if request fails', async () => {
    mockedFetch.mockReturnValueOnce(Promise.reject());

    const {result, waitFor} = renderHook(() => useFetchContacts());

    await waitFor(() => expect(result.current.errorOnFetch).toBeTruthy());

    mockedFetch.mockReturnValueOnce(mockedResponseSuccess);

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.contacts).toHaveLength(2));

    expect(result.current.errorOnFetch).toBeNull();
  });

  it('fetches more data', async () => {
    mockedFetch.mockReturnValueOnce(mockedResponseSuccess);

    const {result, waitFor} = renderHook(() => useFetchContacts());

    await waitFor(() => expect(result.current.contacts).toHaveLength(2));

    mockedFetch.mockReturnValueOnce(mockedResponseMore);

    act(() => {
      result.current.fetchMore();
    });

    expect(result.current.isFetchingMore).toBe(true);

    await waitFor(() => expect(result.current.contacts).toHaveLength(4));

    expect(result.current.isFetchingMore).toBe(false);
  });

  it('returns error if fetch more request fails', async () => {
    mockedFetch.mockReturnValueOnce(mockedResponseSuccess);

    const {result, waitFor} = renderHook(() => useFetchContacts());

    await waitFor(() => expect(result.current.contacts).toHaveLength(2));

    mockedFetch.mockReturnValueOnce(Promise.reject());

    act(() => {
      result.current.fetchMore();
    });

    await waitFor(() => expect(result.current.errorOnFetchMore).toBeTruthy());

    expect(result.current.isFetchingMore).toBe(false);
    expect(result.current.contacts).toHaveLength(2);
  });
});
