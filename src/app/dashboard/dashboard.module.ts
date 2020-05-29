import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [],
})
export class DashboardModule {
}
