import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

// bundle reducers
export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}
// setup the reducers for the StoreModule
export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
