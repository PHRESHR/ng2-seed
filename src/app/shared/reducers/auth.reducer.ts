import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';
import { Auth } from '../models';
import * as authActions from '../actions/auth.action';

export interface AuthState {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  userInfo: FirebaseAuthState;
}

const initialState: AuthState = {
  isAuthenticating: false,
  isAuthenticated: false,
  userInfo: null,
};

export default function(state = initialState, action: authActions.All): AuthState {
  switch (action.type) {
    case authActions.Types.GOOGLE_AUTHENTICATION: {
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    }
    case authActions.Types.FACEBOOK_AUTHENTICATION: {
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    }
    case authActions.Types.TWITTER_AUTHENTICATION: {
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    }
    case authActions.Types.AUTH_SUCCESS: {
      const auth = action.payload;
      return Object.assign({}, state, {
        isAuthenticating: false,
        Authenticated: true,
        userInfo: auth
      });
    }
    case authActions.Types.AUTH_FAILURE:
    case authActions.Types.LOG_OUT: {
      return Object.assign({}, state, {
        isAuthenticated : false,
        userInfo: null
      });
    }
    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export function getIsAuthenticated() {
  return (state$: Observable<AuthState>) => state$
    .select(s => s.isAuthenticated);
};

export function getUserInfo() {
  return (state$: Observable<AuthState>) => state$
    .select(s => s.userInfo && s.userInfo.auth);
}
