import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store} from '@ngrx/store';
import { FirebaseAuth } from 'angularfire2';
import { AppState } from '../../shared/reducers';
import * as authActions from '../../shared/actions';


@Injectable()
export class UnAuthGuard implements CanActivate {

  constructor(
    private auth$: FirebaseAuth,
    private store: Store<AppState>,
    private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('UnAuthGuard.canActivate():', next.url);
    let authenticated: any;
    console.log(this.auth$.take(1));
    console.log(this.store.select('authenticated').take(1));
    return this.auth$
      .take(1)
      .map(authState => !authState)
      .do(unauthenticated => {
         console.log(unauthenticated);
        if (!unauthenticated) {
          this.router.navigate(['/browse']);
        }
      });
  }

}
