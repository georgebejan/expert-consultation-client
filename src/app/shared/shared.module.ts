import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import * as fromGuards from './guards';
import { ModalModule } from 'ngx-bootstrap/modal';

const modules = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  RouterModule,
  TranslateModule,
  PerfectScrollbarModule,
];

@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.components,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    modules,
  ],
  exports: [
    ...fromComponents.components,
    ...fromContainers.components,
    modules,
    BsDatepickerModule,
    BsDropdownModule,
    ModalModule,
  ],
  providers: [
    ...fromGuards.guards,
  ],
})
export class SharedModule {
}
