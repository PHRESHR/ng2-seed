import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, FirebaseAuth } from 'angularfire2';

import * as authActions from '../actions/auth.action';
import { Auth } from '../models';

@Injectable()
export class AuthEffects {
  constructor(
    public auth$: FirebaseAuth,
    public af: AngularFire,
    private actions$: Actions
  ) { }

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

  @Effect()
  logout = this.actions$
    .ofType(authActions.Types.LOG_OUT)
    .map(() => this.auth$.logout())

  @Effect() loginWithGoogle$ = this.actions$
    .ofType(authActions.Types.GOOGLE_AUTHENTICATION)
    .map<Auth>(action => action.payload)
    .switchMap(() =>
      this.auth$.login({provider: AuthProviders.Google})
        .then(userInfo => new authActions.AuthSuccess(userInfo))
        .catch(error => new authActions.AuthFailure(error))
    );

  @Effect() loginWithFacebook$ = this.actions$
    .ofType(authActions.Types.FACEBOOK_AUTHENTICATION)
    .map<Auth>(action => action.payload)
    .switchMap(() =>
      this.auth$.login({provider: AuthProviders.Facebook})
        .then(userInfo => new authActions.AuthSuccess(userInfo))
        .catch(error => new authActions.AuthFailure(error))
    );

  @Effect() loginWithTwitter$ = this.actions$
    .ofType(authActions.Types.TWITTER_AUTHENTICATION)
    .map<Auth>(action => action.payload)
    .switchMap(() =>
      this.auth$.login({provider: AuthProviders.Twitter})
        .then(userInfo => new authActions.AuthSuccess(userInfo))
        .catch(error => new authActions.AuthFailure(error))
    );

  @Effect() authSuccess$ = this.actions$
    .ofType(authActions.Types.AUTH_SUCCESS)
    .map<Auth>(action => action.payload)
    .map(() => console.log(Actions));

  @Effect() authFailure$ = this.actions$
    .ofType(authActions.Types.AUTH_FAILURE)
    .map<Auth>(action => action.payload)
    .map(() => console.log(Actions));
}
