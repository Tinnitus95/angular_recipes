import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';

const mockRecipe: Recipe = {
  name: 'a',
  desc: '',
  imagePath: '',
  ingredients: []
};
const index = 1;

describe('SetRecipes', () => {
  it('should create an action', () => {
    const action = new RecipeActions.SetRecipes([mockRecipe]);

    expect({...action}).toEqual({ type: RecipeActions.SET_RECIPES,
    payload: [mockRecipe]});
  });
});
describe('AddRecipe', () => {
  it('should create an action', () => {
    const action = new RecipeActions.AddRecipe(mockRecipe);

    expect({...action}).toEqual({type: RecipeActions.ADD_RECIPE,
    payload: mockRecipe});
  });
});
describe('UpdateRecipe', () => {
  it('should create an action', () => {
    const action = new RecipeActions.UpdateRecipe({index: index, updatedRecipe: mockRecipe});

    expect({...action}).toEqual({
      type: RecipeActions.UPDATE_RECIPE,
      payload: {
        index: index,
        updatedRecipe: mockRecipe
      }
    });
  });
});
describe('DeleteRecipe', () => {
  it('should create an action', () => {
    const action = new RecipeActions.DeleteRecipe(index);

    expect({...action}).toEqual({
      type: RecipeActions.DELETE_RECIPE,
      payload: index
    });
  });
});
describe('StoreRecipe', () => {
  it('should create an action', () => {
    const action = new RecipeActions.StoreRecipes();

    expect({...action}).toEqual({
      type: RecipeActions.STORE_RECIPES
    });
  });
});
describe('FetchRecipe', () => {
  it('should create an action', () => {
    const action = new RecipeActions.FetchRecipes();

    expect({...action}).toEqual({
      type: RecipeActions.FETCH_RECIPES
    });
  });
});
