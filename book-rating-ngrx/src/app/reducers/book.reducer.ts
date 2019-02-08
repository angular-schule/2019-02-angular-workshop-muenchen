import { Action } from '@ngrx/store';
import { Book } from '../shared/book';
import { BookActions, BookActionTypes } from '../actions/book.actions';


export interface State {
  books: Book[];
  loading: boolean;
}

export const initialState: State = {
  books: [],
  loading: false
};

export function reducer(state = initialState, action: BookActions): State {
  switch (action.type) {

    case BookActionTypes.LoadBooks: {
      return {
        ...state,
        loading: true
      };
    }

    case BookActionTypes.LoadBooksSuccess: {
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
}
