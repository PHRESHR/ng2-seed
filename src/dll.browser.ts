/*
 * README
 * any changes to this file and you have to run `npm run dll` to generate the bundle
 *
 * Polyfills
 * Vendors
 * RxJS
 */

// Polyfills
export function polyfills(env?: any) {
  return [
    // 'ie-shim',

    'core-js/es6/symbol',
    'core-js/es6/object',
    'core-js/es6/function',
    'core-js/es6/parse-int',
    'core-js/es6/parse-float',
    'core-js/es6/number',
    'core-js/es6/math',
    'core-js/es6/string',
    'core-js/es6/date',
    'core-js/es6/array',
    'core-js/es6/regexp',
    'core-js/es6/map',
    'core-js/es6/set',
    'core-js/es6/weak-map',
    'core-js/es6/weak-set',
    'core-js/es6/typed',
    'core-js/es6/reflect',
    // 'core-js/es6/promise', // problem with firefox
    'core-js/es7/reflect',

    // zone.js
    'zone.js/dist/zone',
    'zone.js/dist/long-stack-trace-zone',

    // typescript helpers
    'ts-helpers',
  ];
}

// Angular 2 and other Vendor imports
export function vendors(env?: any) {
  return [
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/platform-server',
    '@angular/compiler',
    '@angular/router',
    '@angular/forms',
    '@angular/common',
    '@angular/core',
    '@angular/http',

    // ngrx
    '@ngrx/core/add/operator/enterZone',
    '@ngrx/core/add/operator/select',
    '@ngrx/effects',
    '@ngrx/store',

    // Immutable
    'immutable'
  ];
}

// RxJS
export function rxjs(env?: any) {
  return [
    'rxjs/Observable',
    'rxjs/Subscription',
    'rxjs/Subject',
    'rxjs/BehaviorSubject',
    'rxjs/add/observable/combineLatest',
    'rxjs/add/observable/fromEvent',
    'rxjs/add/observable/fromEventPattern',
    'rxjs/add/observable/merge',
    'rxjs/add/observable/never',
    'rxjs/add/observable/of',
    'rxjs/add/operator/catch',
    'rxjs/add/operator/combineLatest',
    'rxjs/add/operator/debounceTime',
    'rxjs/add/operator/distinctUntilChanged',
    'rxjs/add/operator/do',
    'rxjs/add/operator/filter',
    'rxjs/add/operator/ignoreElements',
    'rxjs/add/operator/let',
    'rxjs/add/operator/map',
    'rxjs/add/operator/pluck',
    'rxjs/add/operator/publishReplay',
    'rxjs/add/operator/switchMap',
    'rxjs/add/operator/takeUntil',
    'rxjs/add/operator/withLatestFrom',
  ];
}
