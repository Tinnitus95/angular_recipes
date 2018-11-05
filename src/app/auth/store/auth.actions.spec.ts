
import * as AuthActions from './auth.actions';

const user = {
  username: 'oscar@gmail.com',
  password: '1234'
};
const token = 'drcghvbjk';

describe('TRY_SIGNUP', () => {
  it('should create an action', () => {
    const action = new AuthActions.TrySignup(user);

    expect({...action}).toEqual({
      type: AuthActions.TRY_SIGNUP,
      payload: user
    });
  });
});
describe('TRY_SIGNIN', () => {
  it('should create an action', () => {
    const action = new AuthActions.TrySignin(user);

    expect({...action}).toEqual({
      type: AuthActions.TRY_SIGNIN,
      payload: user
    });
  });
});
describe('SIGNUP', () => {
  it('should create an action', () => {
    const action = new AuthActions.Signup();
    expect({...action}).toEqual({
      type: AuthActions.SIGNUP
    });
  });
});
describe('SIGNIN', () => {
  it('should create an action', () => {
    const action = new AuthActions.Signin();
    expect({...action}).toEqual({
      type: AuthActions.SIGNIN
    });
  });
});
describe('LOGOUT', () => {
  it('should create an action', () => {
    const action = new AuthActions.Logout();
    expect({...action}).toEqual({
      type: AuthActions.LOGOUT
    });
  });
});
describe('SET_TOKEN', () => {
  it('should create an action', () => {
    const action = new AuthActions.SetToken(token);
    expect({...action}).toEqual({
      type: AuthActions.SET_TOKEN,
      payload: token
    });
  });
});
