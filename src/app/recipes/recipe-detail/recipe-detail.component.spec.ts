import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { initialState } from './../store/recipe.reducer';
import { TestStore } from './../../shared/testStore.store';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { RecipeDetailComponent } from './recipe-detail.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as ShoppingListAction from './../../shopping-list/store/shopping-list.actions';
import * as RecipeActions from '../store/recipe.actions';

describe('Recipe Detail Component should', () => {
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let component: RecipeDetailComponent;
  let store: TestStore<any>;
  let router;
  let dispatchSpy;

  beforeEach(() => {
    router = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: Store, useClass: TestStore},
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        }],
    }).compileComponents();
  });

  beforeEach(async(inject([Store], (testStore: TestStore<any>) => {
    store = testStore;
    testStore.setState(initialState);
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.debugElement.componentInstance;
    // If fixture.detectChanges isnt working, just remove it.
    fixture.detectChanges();
  })));

  it('render correctly', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });

  it('allow user to send ingredients to shoppingList', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.nativeElement.querySelector('#addToShopping');
    console.log(button);
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListAction.AddIngredients(initialState.recipes[component.id].ingredients)
    );
  });

  it('allow user to delete a recipe', () => {

    dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.nativeElement.querySelector('#delete');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new RecipeActions.DeleteRecipe(component.id)
    );
    expect(router.navigate).toHaveBeenCalledWith(['/recipes']);
  });

  it('redirect to the edit route', () => {
    const button = fixture.nativeElement.querySelector('#edit');
    button.click();


    expect(router.navigate).toHaveBeenCalledWith([`/recipes/${component.id}/edit`]);
  });
});
