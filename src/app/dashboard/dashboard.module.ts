import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import * as fromComponents from './components';
import * as fromContainer from './containers';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [
    ...fromContainer.components,
    ...fromComponents.components,
  ],
  providers: [],
})
export class DashboardModule {
}
