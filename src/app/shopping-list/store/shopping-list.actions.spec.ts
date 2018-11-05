import { Ingredient } from '../../shared/Ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';


const ingredient = new Ingredient('bread', 5);

const ingredients = [new Ingredient('apple', 5), new Ingredient('banana', 6)];

describe('StartEdit', () => {
  it('should create an action', () => {
    const action = new ShoppingListActions.StartEdit(1);
    expect({...action}).toEqual({
      type: ShoppingListActions.START_EDIT,
      payload: 1
    });
  });
});
describe('StopEdit', () => {
  it('should create an action', () => {
    const action = new ShoppingListActions.StopEdit();
    expect({...action}).toEqual({
      type: ShoppingListActions.STOP_EDIT
    });
  });
});
describe('AddIngredients', () => {
  it('should create an action', () => {
    const action = new ShoppingListActions.AddIngredients(ingredients);
    expect({...action}).toEqual({
      type: ShoppingListActions.ADD_INGREDIENTS,
      payload: ingredients
    });
  });
});
describe('AddIngredient', () => {
  it('should create an action', () => {
    const action = new ShoppingListActions.AddIngredient(ingredient);
    expect({...action}).toEqual({
      type: ShoppingListActions.ADD_INGREDIENT,
      payload: ingredient
    });
  });
});
describe('UpdateIngredient', () => {
  it('should create an action', () => {
    const action = new ShoppingListActions.UpdateIngredient(ingredient);
    expect({...action}).toEqual({
      type: ShoppingListActions.UPDATE_INGREDIENT,
      payload: ingredient
    });
  });
});
describe('DeleteIngredient', () => {
  it('should create an action', () => {
    const action = new ShoppingListActions.DeleteIngredient();
    expect({...action}).toEqual({
      type: ShoppingListActions.DELETE_INGREDIENT
    });
  });
});

