import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  AngularFire,
  FirebaseAuthState
} from 'angularfire2';

import { AppState, getAuthIsAuthenticated, getAuthState, getAuthUserInfo } from '../shared/reducers';
import * as authActions from '../shared/actions';
import { AuthInput } from './login-buttons/login-buttons.component';

@Component({
  selector: 'phrsr-auth-status',
  templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {
  authState$: any;
  authenticated$: any;
  userInfo$: any;
  getUserInfo$: any;
  isAuthenticated$: any;
  auth$: Observable<AuthInput>;
  private subscription;
  constructor(
    public af: AngularFire,
    private store: Store<AppState>) {

    this.auth$ = store.select<Object>('auth');
    this.authState$ = this.store.let(getAuthState());
    this.authenticated$ = this.store.map(user => !!user.auth.userInfo);
    this.userInfo$ = this.store.map(user => user.auth.userInfo && user.auth.userInfo.auth);

    console.log('auth$', this.auth$);
    console.log('authState$', this.authState$);
    console.log('authenticated$', this.authenticated$);
    console.log('userInfo$', this.userInfo$);
  }

  ngOnInit() {
    this.subscription =
      this.store
        .let(getAuthState())
        .subscribe(authState => {
          // Triggered when authState changes.
          // i.e. when user logs in or logs out.
          console.log('authState>', authState);
          console.log('authState.isAuthorized>', authState);
        });

    this.af.auth.take(1).subscribe((authState: FirebaseAuthState) => {
      // Run once.
      // af.auth.unsubscribe();

      // console.log('af.auth.subscribe:authState>', authState);
      let isAuthenticated: boolean = !!authState;

      // console.log('isAuthenticated:', isAuthenticated);

      if (isAuthenticated) {
        // console.log('isAuthenticated: true');
      }
    });
  }

  getAuthState() {
    return this.store.let(getAuthState());
  }

  signInWithGoogle() {
    this.store.dispatch(new authActions.GoogleAuthentication());
  }

  logout() {
    this.store.dispatch(new authActions.LogOut());
    this.af.auth.logout();
  }
}
