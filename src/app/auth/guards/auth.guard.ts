import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store} from '@ngrx/store';
import { FirebaseAuth } from 'angularfire2';
import { AppState } from '../../shared/reducers';
import * as authActions from '../../shared/actions';


@Injectable()
export class AuthGuard implements CanActivate {
  private state$: Observable<AppState>;

  constructor(
    private auth$: FirebaseAuth,
    private store: Store<AppState>,
    private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard.canActivate():', next.url);
    console.log('store', this.store);
    return this.auth$
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/']);
        }
      });
  }
}
