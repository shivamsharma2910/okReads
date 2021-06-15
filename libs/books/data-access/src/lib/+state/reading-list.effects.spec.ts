import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { SharedTestingModule, createReadingListItem } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  describe('When user tries to mark the book as finished', () => {
    const newReadingListItem = createReadingListItem('A')
    actions = new ReplaySubject();

    it('should dispatch markAsFinishedSucces action for mark as finished if api returns success response', done => {
      actions.next(ReadingListActions.markAsFinished({item: newReadingListItem}));
      effects.markAsFinished$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.markAsFinishedSuccess({ item: newReadingListItem })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list/A/finished').flush([]);
    });

    it('should dispatch markAsFinishedFailure action for mark as finished if api returns error response', done => {
      actions.next(ReadingListActions.markAsFinished({item: newReadingListItem}));
      effects.markAsFinished$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.markAsFinishedFailure({error: 'request for mark as finished failed'})
        );
        done();
      });

      httpMock.expectOne('/api/reading-list/A/finished').flush('error message', {status: 400, statusText: 'bad request'});
    });
  });
});
