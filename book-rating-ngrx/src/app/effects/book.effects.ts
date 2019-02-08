import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookActionTypes, LoadBooksSuccess } from '../actions/book.actions';
import { BookStoreService } from '../shared/book-store.service';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class BookEffects {

  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(BookActionTypes.LoadBooks),
    switchMap(() => this.bs.getAll()),
    map(books => new LoadBooksSuccess(books))
  );

  constructor(private actions$: Actions, private bs: BookStoreService) {}

}
