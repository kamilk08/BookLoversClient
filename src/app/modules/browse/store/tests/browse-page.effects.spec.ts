import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects"
import { provideMockActions } from "@ngrx/effects/testing"
import { Action, StoreModule } from "@ngrx/store"
import { Observable, of } from "rxjs"
import { TestScheduler } from "rxjs/testing"
import { browseModuleReducer } from ".."
import { BrowsePageEffects } from "../browse-page.effects"
import { BrowseFacade } from "../browse.facade"

import * as fromActions from '../browse-page.actions';
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories"


describe('BROWSE_PAGE_EFFECTS', () => {
  let scheduler: TestScheduler;
  let effects: BrowsePageEffects;
  let actions$: Observable<Action>;
  let facade: BrowseFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('browse', browseModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BrowsePageEffects])

      ],
      providers: [BrowsePageEffects,
        {
          provide: BrowseFacade,
          useValue: {
            selectedCategories$: of([ALL_SUBCATEGORIES[0].id])
          }
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(BrowsePageEffects);
    facade = TestBed.get(BrowseFacade);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  })

  describe('SELECT_CATEGORY$', () => {
    it('should dispatch REMOVE_CATEGORY action when given category was already selected', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_CATEGORY({ payload: { subCategory: ALL_SUBCATEGORIES[0], localIndex: 1 } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.REMOVE_CATEGORY({ payload: { id: ALL_SUBCATEGORIES[0].id } });

        expectObservable(effects.selectCategory$).toBe('b', { b: completion });
      })

    });
  })

})
