import {useReducer} from 'react';

import {ContactDataType} from '../../api';

type StateType = {
  isFetching: boolean;
  isFetchingMore: boolean;
  error: string | null;
  contacts: ReadonlyArray<ContactDataType> | null;
};

type ActionType =
  | {type: 'start-fetching'}
  | {type: 'stop-fetching'}
  | {type: 'start-fetching-more'}
  | {type: 'stop-fetching-more'}
  | {type: 'set-error'; payload: {error: string}}
  | {type: 'clear-error'}
  | {type: 'add-contacts'; payload: {contacts: ReadonlyArray<ContactDataType>}};

const initialState = {
  isFetching: false,
  isFetchingMore: false,
  error: null,
  contacts: null,
};

export function useFetchContactsState() {
  return useReducer(reducer, initialState);
}

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'start-fetching':
      return {...state, isFetching: true};

    case 'stop-fetching':
      return {...state, isFetching: false};

    case 'start-fetching-more':
      return {...state, isFetchingMore: true};

    case 'stop-fetching-more':
      return {...state, isFetchingMore: false};

    case 'set-error':
      return {...state, error: action.payload.error};

    case 'clear-error':
      return {...state, error: null};

    case 'add-contacts':
      const currentContacts = state.contacts ?? [];

      return {...state, contacts: [...currentContacts, ...action.payload.contacts]};

    default:
      return state;
  }
}
