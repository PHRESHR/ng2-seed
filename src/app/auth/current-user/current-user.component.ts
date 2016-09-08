import { Component, Input } from '@angular/core';
import { FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'phrsr-current-user',
  templateUrl: 'current-user.component.html',
  styleUrls: ['current-user.component.css']
})
export class CurrentUserComponent {
  @Input('user') userInfo: FirebaseAuthState;

  constructor() { }
}
