import {User} from '../../core/models/user';
import {All, AuthActionTypes} from '../actions/auth.actions';

export interface  State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}


export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};


export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.id,
          age: action.payload.age,
          isAdmin: action.payload.isAdmin,
          password: action.payload.password,
          email: action.payload.email,
          name: action.payload.name
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
      case AuthActionTypes.SIGNUP_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: {
            id: action.payload.id,
            age: action.payload.age,
            isAdmin: action.payload.isAdmin,
            password: action.payload.password,
            email: action.payload.email,
            name: action.payload.name
          },
          errorMessage: null
        };
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
