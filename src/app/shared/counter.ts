import { ActionReducer, Action } from '@ngrx/store';

export interface AppState {
  counter: number;
}

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export const counterReducer: ActionReducer<number> = (state = 0, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;

    case DECREMENT:
      if (state === 0) {
        return state;
      } else {
        return state - 1;
      }

    case RESET:
      return 0;

    default:
      return state;
  }
}
