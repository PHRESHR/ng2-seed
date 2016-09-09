import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';

// HMR
import { handleHmr } from './hmr';

// Root module
import { AppModule } from './app';

function bootstrap() {
  return platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .then(decorateModuleRef)
      .catch(err => console.error(err));
}

// We may bootstrap the app in one of two ways..
if ((<any>module).hot) {
  // A hot loading bootstrap. Delegate to handleHmr, see hmr.ts.
  handleHmr(module, bootstrap);
} else {
  // A regular (cold) bootstrap, when not doing hot loading. We just call
  // Angular's bootstrap directly from this module.
  bootstrap();
}
