import { Recipe } from './../recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducer';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) {}
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(
      switchMap((action: RecipeActions.FetchRecipes) => {
       return this.httpClient.get<Recipe[]>('https://ng-recipe-book-ffc30.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    });
  }),
  (map(
    (recipes) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    }
  ))
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-ffc30.firebaseio.com/recipes.json',
        state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
      })

    );

}
