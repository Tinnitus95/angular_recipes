import { Ingredient } from 'src/app/shared/Ingredient.model';

import { Store } from '@ngrx/store';
import { ShoppingListComponent } from './shopping-list.component';
import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { TestStore } from './../shared/testStore.store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as ShoppingListActions from './store/shopping-list.actions';

describe('ShoppingList Component should', () => {
  let store: TestStore<any>;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let component: ShoppingListComponent;
  let dispatchSpy;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ShoppingListComponent],
      providers: [
        {provide: Store, useClass: TestStore}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(async(inject([Store], (testStore: TestStore<any>) => {
    store = testStore;
    store.setState({
      ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ],
      editedIngredient: null,
      editedIngredientIndex: -1
    });
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  })));

  it('renders correctly', () => {
    expect(component).toBeTruthy();
  });

  it('dispatch the StartEdit action', () => {
    dispatchSpy = spyOn(store, 'dispatch');


    const ingredient = fixture.debugElement.nativeElement.querySelector('a');
    ingredient.click();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.StartEdit(0)
    );
  });
});
