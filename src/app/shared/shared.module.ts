import { NgModule, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { counterReducer } from './counter';

import { NavbarComponent } from './navbar';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.provideStore({ counter: counterReducer }, { counter: 0 }),
    StoreDevtoolsModule.instrumentStore({
      maxAge: 5,
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    /**
     * runEffects configures all providers for @ngrx/effects. Observables decorated
     * as an @Effect() within the supplied services will ultimately be merged,
     * with output of relevant (registered as effects) actions being
     * dispatched into your application store. Any side-effects in
     * your application should be registered as effects.
     *
     * Source: https://github.com/ngrx/effects/blob/master/lib/run-effects.ts#L8-L20
     */
    EffectsModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    StoreLogMonitorModule,
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
