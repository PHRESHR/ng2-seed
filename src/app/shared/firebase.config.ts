import { AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyA9vRKVGuE-KSVG1C_IwgbsASjor82Fu-A',
  authDomain: 'phreshr-app.firebaseapp.com',
  databaseURL: 'https://phreshr-app.firebaseio.com',
  storageBucket: 'phreshr-app.appspot.com'
};

export const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default',
  scope: ['email']
};
