
import { of, BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TestStore } from './../../shared/testStore.store';
import { RecipeEditComponent } from './recipe-edit.component';
import {
  ComponentFixture,
  TestBed,
  async,
  inject
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule, FormArray, FormControl, FormGroup } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import * as RecipeActions from '../store/recipe.actions';
import { initialState } from '../store/recipe.reducer';

// very good
@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() {return this._testParams; }
  set testParams(params: {} ) {
    this._testParams = params;
    this.subject.next(params);
  }
}

describe('RecipeEdit component should', () => {
  let mockActivatedRoute;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let component: RecipeEditComponent;
  let store: TestStore<any>;
  let dispatchSpy;
  let router;

  beforeEach(() => {
    router = {
      navigate: jasmine.createSpy('navigate')
    };
    mockActivatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: Store, useClass: TestStore },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: mockActivatedRoute}
        // {
        //   provide: ActivatedRoute,
        //   useValue: {
        //     params: of({ id: paramId })
        //   }
        // }
      ]
    }).compileComponents();
  });
  beforeEach(async(
    inject([Store], (testStore: TestStore<any>) => {
      store = testStore;
      store.setState(initialState);
      fixture = TestBed.createComponent(RecipeEditComponent);
      component = fixture.debugElement.componentInstance;
    })
    ));

    it('renders correctly', () => {
      expect(component).toBeTruthy();
    });

    it('Update an existing recipe', () => {
      mockActivatedRoute.testParams = {id: 1};
      fixture.detectChanges();

    dispatchSpy = spyOn(store, 'dispatch');

    const button = fixture.debugElement.nativeElement.querySelector('#formSubmit');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new RecipeActions.UpdateRecipe({
        index: component.id,
        updatedRecipe: component.recipeForm.value
      })
    );
  });

  it('navigate to ../ when cancelled', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#cancel');
    button.click();

    expect(router.navigate).toHaveBeenCalledWith([`/recipes/${component.id}`]);
  });




  it('dispatch AddRecipe action if editmode is false', () => {
    mockActivatedRoute.testParams = {id: null};
    fixture.detectChanges();
    component.recipeForm.controls['name'].setValue('Apple pie');
    component.recipeForm.controls['imagePath'].setValue('Apple.pie.com');
    component.recipeForm.controls['description'].setValue('delish pie');
    fixture.detectChanges();
    // console.log(component.recipeForm);

    dispatchSpy = spyOn(store, 'dispatch');
    // console.log(component);


    const button = fixture.debugElement.nativeElement.querySelector('#formSubmit');

    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    expect(dispatchSpy).toHaveBeenCalledWith(

      new RecipeActions.AddRecipe(component.recipeForm.value)
    );
  });

  describe('Recipe Form should', () => {
    beforeEach(() => {
      mockActivatedRoute.testParams = {id: null};
      fixture.detectChanges();
      component.recipeForm.controls['name'].setValue('Apple pie');
      component.recipeForm.controls['imagePath'].setValue('Apple.pie.com');
      component.recipeForm.controls['description'].setValue('delish pie');
      fixture.detectChanges();
      const ingArray =  [new FormGroup({name: new FormControl( 'tomato'), amount: new FormControl( 10000 )}),
      new FormGroup({name: new FormControl('letuce'), amount: new FormControl( 1 )}) ];

      (<FormArray>component.recipeForm.controls['ingredients']).push(ingArray[0]);
      (<FormArray>component.recipeForm.controls['ingredients']).push(ingArray[1]);
    });
    it('add an ingredient', () => {

      component.onAddIngredient();

      expect(component.recipeForm.controls['ingredients'].value).toEqual([{name: 'tomato', amount: 10000 },
      {name: 'letuce', amount: 1 }, {name: null, amount: null}]);

    });
    it('delete an ingredient', () => {
      component.onDeleteIngredient(1);

      expect(component.recipeForm.controls['ingredients'].value).toEqual([{name: 'tomato', amount: 10000 }]);
    });

  });


});
