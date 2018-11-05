
import { TestStore } from './../../shared/testStore.store';

import { Ingredient } from './../../shared/Ingredient.model';

import { inject} from '@angular/core/testing';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ShoppingListEditComponent } from './shopping-list-edit.component';


import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import * as ShoppingListActions from './../store/shopping-list.actions';


describe('ShoppingListEdit should', () => {
  let fixture: ComponentFixture<ShoppingListEditComponent>;
  let component: ShoppingListEditComponent;
  let store: TestStore<any>;
  let dispatchSpy;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShoppingListEditComponent
      ],
      providers: [
        {provide: Store, useClass: TestStore}
      ],
      imports: [FormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ShoppingListEditComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });
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
  })));

  it('create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('dispatch AddIngredient action if editmode is false', async(() => {
    dispatchSpy = spyOn(store, 'dispatch');

    const button = fixture.debugElement.nativeElement.querySelector('.btn-success');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    // expect(dispatchSpy).toHaveBeenCalledWith(
    //   new ShoppingListActions.AddIngredient(new Ingredient('', ''))
    // );

  }));

  it('dispatch UpdateIngredient action is editmode is true', () => {
    store.setState({
      ingredients: [
          new Ingredient('Apples', 5),
          new Ingredient('Tomatoes', 10),
        ],
        editedIngredient: {name: 'Tomatoes', amount: 10},
        editedIngredientIndex: 1
    });
    dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('.btn-success');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.UpdateIngredient(new Ingredient('Tomatoes', 10))
    );
  });

  it('dispatch DeleteIngredient action', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    component.editMode = true;
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.btn-danger');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.DeleteIngredient()
    );
  });

});
