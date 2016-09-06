import { FirebaseAuthState } from 'angularfire2';

export interface Auth {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  userInfo: FirebaseAuthState;
  error: any;
}
