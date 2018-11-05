import { TestStore } from './../../shared/testStore.store';

import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import * as RecipeActions from './../../recipes/store/recipe.actions';
import * as AuthActions from './../../auth/store/auth.actions';

describe('Header Component should', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let store: TestStore<any>;
  let dispatchSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{
        provide: Store, useClass: TestStore
      }],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });
  beforeEach(async(inject([Store], (testStore: TestStore<any>) => {
    store = testStore;
    store.setState({
      token: null,
      authenticated: true
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })));

  it('render correctly', () => {
    expect(component).toBeTruthy();
  });

  it('save the recipes', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('#save');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new RecipeActions.StoreRecipes()
    );
  });

  it('fetch the recipes', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('#get');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new RecipeActions.FetchRecipes()
    );
  });

  it('allow the use to logout', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('#logout');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AuthActions.Logout()
    );
  });
});

