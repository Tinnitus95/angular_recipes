import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';
import { Ingredient } from '../../shared/Ingredient.model';

// Get the whole app state
export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'Great Schnitzel',
      'https://thecozyapron.com/wp-content/uploads/2012/02/schnitzel_thecozyapron_1.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),

      ]
    ),
    new Recipe(
      'Weird thing',
      'Looks tasty tho',
      // tslint:disable-next-line:max-line-length
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
      [
        new Ingredient('dough', 1),
        new Ingredient('sauce', 1)
      ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch ( action.type) {
    case (RecipeActions.SET_RECIPES):
    return {
      ...state,
      recipes: [...action.payload]
    };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
