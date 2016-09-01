import { NgModule, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { AngularFireModule } from 'angularfire2';

import {
  firebaseConfig,
  firebaseAuthConfig
} from './firebase.config';

import { NavbarComponent } from './navbar';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    // StoreModule.provideStore(rootReducer),
    // StoreDevtoolsModule.instrumentStore({
    //   maxAge: 5,
    //   monitor: useLogMonitor({
    //     visible: true,
    //     position: 'right'
    //   })
    // }),
    // StoreLogMonitorModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [Title]
    };
  }
}
