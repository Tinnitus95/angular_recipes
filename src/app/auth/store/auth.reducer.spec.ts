
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducer';

const mockState = {
  token: '12qwhhnqw',
  authenticated: true
};
const token = 'harryPotter';

describe('AuthRedeucer', () => {
  describe('undefined action', () => {
    it('should return the initial state', () => {
      const {initialState} = fromAuth;
      const action = {};
      // @ts-ignore
      const state = fromAuth.authReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('SIGNUP', () => {
    it('should set the authenticated state to true', () => {
      const {initialState} = fromAuth;
      const action = new AuthActions.Signup();
      const state = fromAuth.authReducer(initialState, action);

      expect(state.authenticated).toBe(true);
    });
  });
  describe('SIGNIN', () => {
    it('should set the authenticated state to true', () => {
      const {initialState} = fromAuth;
      const action = new AuthActions.Signin();
      const state = fromAuth.authReducer(initialState, action);

      expect(state.authenticated).toBe(true);
    });
  });
  describe('LOGOUT', () => {
    it('should set the authenticated state to true', () => {
      const {initialState} = fromAuth;
      const action = new AuthActions.Logout();
      const state = fromAuth.authReducer(mockState, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('SET_TOKEN', () => {
    it('should set the token', () => {
      const {initialState} = fromAuth;
      const action = new AuthActions.SetToken(token);
      const state = fromAuth.authReducer(initialState, action);

      expect(state.token).toEqual(token);
    });
  });

});
