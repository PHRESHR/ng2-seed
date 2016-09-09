import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'angular2-apollo';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { SharedModule } from './shared/shared.module';
import { BrowseModule } from './browse/browse.module';
import { AboutModule } from './about/about.module';
import { NotFoundModule } from './not-found/not-found.module';
import { client } from './client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule.withClient(client),
    AppRoutes,
    BrowseModule,
    AboutModule,
    NotFoundModule,
    SharedModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() { }
}
