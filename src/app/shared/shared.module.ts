import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import * as fromGuards from './guards';

const modules = [
  CommonModule,
  FlexLayoutModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule,
  TranslateModule,
];

@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.components,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    modules,
  ],
  exports: [
    ...fromComponents.components,
    ...fromContainers.components,
    modules,
    BsDatepickerModule,
    BsDropdownModule,
  ],
  providers: [
    ...fromGuards.guards,
  ],
})
export class SharedModule {
}
