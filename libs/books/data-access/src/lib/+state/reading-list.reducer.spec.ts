import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(3);
    });

    it('confirmedAddToReadingList action should update the current state by adding an item', () => {
      const action = ReadingListActions.confirmedAddToReadingList({
        book: createBook('D'), fromUndo: false
      });

      const result: State = reducer(state, action);
      expect(result.ids[2]).toEqual('D');
      expect(result.ids.length).toEqual(3);
    });

    it('failedAddToReadingList should not update the current state', () => {
      const action = ReadingListActions.failedAddToReadingList({
        error: 'unable to add book'
      });

      const result: State = reducer(state, action);

      expect(result.ids[0]).toEqual('A');
      expect(result.ids.length).not.toEqual(3);
    });

    it('confirmedRemoveFromReadingList should update the state by removing an item', () => {
      const action = ReadingListActions.confirmedRemoveFromReadingList({
        item: createReadingListItem('B'), fromUndo: false
      });
      const result: State = reducer(state, action);
      expect(result.ids.length).toEqual(1);
      expect(result.ids[0]).toEqual('A');
    });

    it('failedRemoveFromReadingList should not update the current state', () => {
      const action = ReadingListActions.failedRemoveFromReadingList({
        error: 'unable to remove book'
      });

      const result: State = reducer(state, action);

      expect(result.ids.length).not.toEqual(1);
      expect(result.ids[1]).toEqual('B');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
