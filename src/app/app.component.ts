import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'PHRESHR';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}