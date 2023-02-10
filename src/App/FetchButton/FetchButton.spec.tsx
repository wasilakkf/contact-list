import {render, screen, fireEvent} from '@testing-library/react';

import {FetchButton} from './FetchButton';

const defaultTestProps = {
  refetch: jest.fn(),
  fetchMore: jest.fn(),
};

describe('<FetchButton />', () => {
  beforeEach(jest.clearAllMocks);

  it('renders load more button that invokes "fetchMore" callback', () => {
    render(<FetchButton {...defaultTestProps} />);

    expect(screen.queryByTestId('fetch_button_fetch_more')).toBeInTheDocument();
    expect(screen.queryByTestId('fetch_button_refetch_more')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fetch_button_refetch')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('fetch_button_fetch_more'));

    expect(defaultTestProps.fetchMore).toHaveBeenCalledTimes(1);
  });

  it('renders refetch more button that invokes "fetchMore" callback', () => {
    render(<FetchButton {...defaultTestProps} errorOnFetchMore="some error" />);

    expect(screen.queryByTestId('fetch_button_fetch_more')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fetch_button_refetch_more')).toBeInTheDocument();
    expect(screen.queryByTestId('fetch_button_refetch')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('fetch_button_refetch_more'));

    expect(defaultTestProps.fetchMore).toHaveBeenCalledTimes(1);
  });

  it('renders refetch button that invokes "refetch" callback', () => {
    render(<FetchButton {...defaultTestProps} errorOnFetch="some error" />);

    expect(screen.queryByTestId('fetch_button_fetch_more')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fetch_button_refetch_more')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fetch_button_refetch')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('fetch_button_refetch'));

    expect(defaultTestProps.refetch).toHaveBeenCalledTimes(1);
  });
});
