import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { BrowseComponent } from './browse.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BrowseComponent],
  exports: [BrowseComponent],
  providers: []
})
export class BrowseModule { }
