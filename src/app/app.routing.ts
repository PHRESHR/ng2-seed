import { RouterModule, Routes } from '@angular/router';

import { BrowseRoutes } from './browse';
import { AboutRoutes } from './about/about.routing';
import { NotFoundRoutes } from './not-found/not-found.routing';

const routes: Routes = [
  ...BrowseRoutes,
  ...AboutRoutes,
  ...NotFoundRoutes
];

export const AppRoutes = RouterModule.forRoot(routes);
