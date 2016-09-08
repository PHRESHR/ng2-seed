import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';
import { Auth } from '../models';
import { label } from '../util';

/**
 * For each action type in an action group, we make a simple
 * enum object for all of our action types.
 *
 * The 'label' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * actions in the application are unique.
 */

export const Types = {
  GOOGLE_AUTHENTICATION: label('[Auth] Google Authentication'),
  FACEBOOK_AUTHENTICATION: label('[Auth] Facebook Authentication'),
  TWITTER_AUTHENTICATION: label('[Auth] Twitter Authentication'),
  AUTH_SUCCESS: label('[Auth] AUTH_SUCCESS'),
  AUTH_FAILURE: label('[Auth] FAILURE AUTH_FAILURE'),
  LOG_OUT: label('[Auth] LOG_OUT')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in our reducer functions.
 */
export class GoogleAuthentication implements Action {
  type = Types.GOOGLE_AUTHENTICATION;

  constructor() { }
}

export class FacebookAuthentication implements Action {
  type = Types.FACEBOOK_AUTHENTICATION;

  constructor() { }
}

export class TwitterAuthentication implements Action {
  type = Types.TWITTER_AUTHENTICATION;

  constructor() { }
}

export class AuthSuccess implements Action {
  type = Types.AUTH_SUCCESS;
  userInfo: FirebaseAuthState;
  constructor(public payload: FirebaseAuthState) { }
}

export class AuthFailure implements Action {
  type = Types.AUTH_FAILURE;
  constructor(public payload: Error) { }
}

export class LogOut implements Action {
  type = Types.LOG_OUT;

  constructor() { }
}

/**
 * We export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All =
    GoogleAuthentication
  | FacebookAuthentication
  | TwitterAuthentication
  | AuthSuccess
  | AuthFailure
  | LogOut
