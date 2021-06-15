import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import * as ReadingListActions from './reading-list.actions';
import { Store } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { TypedAction } from "@ngrx/store/src/models";

@Injectable()
export class SnackBarEffects {

  undoAddition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList),
      tap((action) => {
        if (!action.fromUndo) {
          const listItem: ReadingListItem = {
            ...action.book,
            bookId: action.book.id
          };
          this.openSnackBar(
            `${action.book.title} added to reading list`,
            ReadingListActions.removeFromReadingList({ item: listItem, fromUndo: true })
            );
        }
      }
      )
    ), { dispatch: false });

  undoRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedRemoveFromReadingList),
      tap((action) => {
        if (!action.fromUndo) {
          const book: Book = {
            id: action.item.bookId,
            ...action.item
          };
          this.openSnackBar(
            `${action.item.title} removed from reading list`,
            ReadingListActions.addToReadingList({ book: book, fromUndo: true })
            );
        }
      }
      )
    ), { dispatch: false });

    openSnackBar(message: string, action: TypedAction<string>) {
      this.matSnackBar.open(message, 'Undo', { duration: 5000 })
      .onAction()
      .subscribe(()=> {
        this.store.dispatch(action);
      })
    }

  constructor(private actions$: Actions,
    private matSnackBar: MatSnackBar, private store: Store) {
  }

}