
import { Ingredient } from 'src/app/shared/Ingredient.model';
import * as fromShopping from './shopping-list.reducer';
import * as ShoppingListActions from './shopping-list.actions';

const mockIngredient: Ingredient = new Ingredient('bread', 5);
const mockIngredientArray: Ingredient[] = [mockIngredient, mockIngredient];
const index = 0;
const mockEditState = {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: {name: 'Apples', amount: 5},
    editedIngredientIndex: 0
};

describe('ShoppingReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {

      const {initialState} = fromShopping;
      const action = {};
      // @ts-ignore
      const state = fromShopping.shoppingListReducer(undefined, action );

      expect(state).toBe(initialState);
    });
  });

  describe('ADD_INGREDIENT action', () => {
    it('should add a ingredient to the ingredients array', () => {
      const {initialState} = fromShopping;
      const action = new ShoppingListActions.AddIngredient(mockIngredient);
      const state = fromShopping.shoppingListReducer(initialState, action);
      // Need to spread the initial state ingredients
      expect(state.ingredients).toEqual([...initialState.ingredients, mockIngredient]);
    });
  });
  describe('ADD_INGREDIENTS action', () => {
    it('should add an array of ingredients to the ingredients array', () => {
      const {initialState} = fromShopping;
      const action = new ShoppingListActions.AddIngredients(mockIngredientArray);
      const state = fromShopping.shoppingListReducer(initialState, action);

      expect(state.ingredients).toEqual([...initialState.ingredients, ...mockIngredientArray]);
    });
  });
  describe('UPDATE_INGREDIENT action', () => {
    it('should update an ingredient in the array', () => {
      const action = new ShoppingListActions.UpdateIngredient(mockIngredient);
      const state = fromShopping.shoppingListReducer(mockEditState, action);

      // HACK?
      expect(state.ingredients[0]).toEqual({name: 'bread', amount: 5});
    });
  });
  describe('DELETE_INGREDIENT action', () => {
    it('should delete an ingredient from the array', () => {
      const action = new ShoppingListActions.DeleteIngredient();
      const state = fromShopping.shoppingListReducer(mockEditState, action);
      // HACK?
      expect(state.ingredients.length).toBe(1);
    });
  });
  describe('START_EDIT action', () => {
    it('should set the editedIngredient and its index', () => {
      const {initialState} = fromShopping;
      const action = new ShoppingListActions.StartEdit(index);
      const state = fromShopping.shoppingListReducer(initialState, action);

      expect(state).toEqual(mockEditState);

    });
  });
  describe('STOP_EDIT action', () => {
    it('should clear the editedIngredient and its index', () => {
      const {initialState} = fromShopping;
      const action = new ShoppingListActions.StopEdit();
      const state = fromShopping.shoppingListReducer(mockEditState, action);

      expect(state).toEqual(initialState);
    });
  });
});
