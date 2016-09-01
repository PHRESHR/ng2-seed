import { Route } from '@angular/router';

import { BrowseComponent } from './browse.component';

export const BrowseRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'browse',
    pathMatch: 'full'
  },
  {
    path: 'browse',
    component: BrowseComponent
  }
];
