import { Route } from '@angular/router';

import { AuthComponent } from './auth.component';
import { UnAuthGuard } from './guards/unauth.guard';

export const AuthRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [UnAuthGuard]
  }
];
