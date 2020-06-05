import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import * as fromComponents from './components';
import * as fromContainers from './containers';
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
  NgbModule,
];

@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.components,
  ],
  imports: [
    modules,
  ],
  exports: [
    ...fromComponents.components,
    ...fromContainers.components,
    modules,
  ],
  providers: [
    ...fromGuards.guards,
  ],
})
export class SharedModule {
}
