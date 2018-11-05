
import * as AuthActions from './auth.actions';
export interface State {
  token: string;
  authenticated: boolean;
}

export const initialState = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    // Set up Fallthrough, if signup dont get matched, signin will have a chance
    case (AuthActions.SIGNUP):
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
      case(AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false
      };
      case(AuthActions.SET_TOKEN):
        return {
          ...state,
          token: action.payload
        };
      default:
      return state;
  }
}
