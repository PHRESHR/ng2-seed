/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CurrentUserComponent } from './current-user.component';

describe('Component: CurrentUser', () => {
  it('should create an instance', () => {
    let component = new CurrentUserComponent();
    expect(component).toBeTruthy();
  });
});
