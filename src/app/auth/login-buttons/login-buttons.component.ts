import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Auth } from '../../shared/models';

export type AuthInput = Auth;
// export type isAuthenticated = boolean;
// export type loginWithGoogle = Auth;
// export type loginWithFacebook = Auth;
// export type logout = Auth;

@Component({
  selector: 'phrsr-login-buttons',
  templateUrl: 'login-buttons.component.html',
  styleUrls: ['login-buttons.component.css']
})
export class LoginButtonsComponent {
  /**
   * Dumb components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'dumb' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   *
   * Tip: Utilize getters to keep templates clean in 'dumb' components.
   */
  @Input() auth: AuthInput;
  @Input() isAuthenticated: boolean;
  @Output() loginWithGoogle = new EventEmitter();
  @Output() loginWithFacebook = new EventEmitter();
  @Output() loginWithTwitter = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() { }

  get authenticated$() {
    return this.auth.isAuthenticated;
  }

  get authenticating$() {
    return this.auth.isAuthenticating;
  }

  get userInfo$() {
    return this.auth.userInfo;
  }

  get error$() {
    return this.auth.error;
  }

}
