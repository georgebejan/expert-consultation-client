import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import * as fromContainers from './containers';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
  ],
  declarations: [
    ...fromContainers.components,
  ],
  exports: []
})
export class AuthenticationModule {
}
