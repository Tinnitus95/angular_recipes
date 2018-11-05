
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducer';
import { Recipe } from '../recipe.model';

const mockRecipe: Recipe = {
  name: 'a',
  desc: '',
  imagePath: '',
  ingredients: []
};

const index = 1;


describe('RecipeReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromRecipe;
      const action = {};
      // @ts-ignore
      const state = fromRecipe.recipeReducer(undefined, action );

      expect(state).toBe(initialState);
    });
  } );

  describe('SET_RECIPES action', () => {
    it('should set the recipes array', () => {
      const {initialState} = fromRecipe;
      const action = new RecipeActions.SetRecipes([mockRecipe]);
      const state = fromRecipe.recipeReducer(initialState, action);

      expect(state.recipes).toEqual([mockRecipe]);

    });
  });

  describe('ADD_RECIPE action', () => {
    it('should add a recipe to the recipes array', () => {
      const { initialState } = fromRecipe;
      const action = new RecipeActions.AddRecipe(mockRecipe);
      const state = fromRecipe.recipeReducer(initialState, action);

      expect(state.recipes).toEqual([...initialState.recipes, mockRecipe] );
    });

  });

  describe('UPDATE_RECIPE action', () => {
    it('should update a recipe in the recipes array', () => {
      const {initialState} = fromRecipe;
      const action = new RecipeActions.UpdateRecipe({index: index, updatedRecipe: mockRecipe});
      const state = fromRecipe.recipeReducer(initialState, action);

      expect(state.recipes[index]).toEqual(mockRecipe);
    });

  });

  describe('DELETE_RECIPE action', () => {
    it('should delete a recipe from the recipes array', () => {
      const {initialState} = fromRecipe;
      const action = new RecipeActions.DeleteRecipe(index);
      const state = fromRecipe.recipeReducer(initialState, action);
      // console.log(state.recipes);

      expect(state.recipes.length).toEqual(1);
    });
  });

});

