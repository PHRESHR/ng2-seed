import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { INCREMENT, DECREMENT, RESET, AppState } from './shared/counter';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'PHRESHR';
  counter: Observable<number>;

  constructor(
    public store: Store<AppState>,
    private titleService: Title) {
    this.titleService.setTitle(this.title);
    this.counter = store.select('counter');
  }

  increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
}
