import { StoreModule } from '@ngrx/store';
import { RecipesComponent } from './recipes.component';
import { async, TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { recipeReducer } from './store/recipe.reducer';



describe('RecipesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipesComponent
      ],
      imports: [
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the recipes', () => {
    const fixture = TestBed.createComponent(RecipesComponent);
    const recipes = fixture.debugElement.componentInstance;
    expect(recipes).toBeTruthy();
  });
});
