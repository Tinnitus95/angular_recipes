import { initialState } from './../store/recipe.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestStore } from './../../shared/testStore.store';
import { RecipeListComponent } from './recipe-list.component';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';



describe('Recipe List Component should', () => {
  let fixture: ComponentFixture<RecipeListComponent>;
  let component: RecipeListComponent;
  let store: TestStore<any>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: Store, useClass: TestStore},
        { provide: Router, useValue: router },
        {provide: ActivatedRoute, useValue: {snapshot: {
          url: []
        }} }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });
  beforeEach(async(inject([Store], (testStore: TestStore<any>) => {
    store = testStore;
    store.setState(initialState);
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }))
  );

  it('render correctly', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to new route when new recipe is clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(router.navigate).toHaveBeenCalledWith(['/recipes/new']);
  });
});
