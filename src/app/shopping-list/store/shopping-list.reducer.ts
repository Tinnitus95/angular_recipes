
import { Ingredient } from '../../shared/Ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions ) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    }
    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    }
    case ShoppingListActions.UPDATE_INGREDIENT: {
      // find the ingredient with the correct index We use the editedIngredientIndex that is
      // set by the StartEdit action
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // overwrite the old ingredient with the new one
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      // get the current ingredients array
      const ingredients = [...state.ingredients];
      // set the ingredient at the payload.index to be our new updated ingredient
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1

      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      // get the old ingredients array
      const oldIngredients = [...state.ingredients];
      // splice out at the correct index
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActions.START_EDIT: {
      // get the ingredient with the correct index
      const editedIngredient = {...state.ingredients[action.payload]};
      // set the index to be that of the payload, Doing this will give information to redux so we don't have to pass it
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      // Blank the edited state, Dont forget to always pass prevstate
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    default:
      return state;
  }
}
