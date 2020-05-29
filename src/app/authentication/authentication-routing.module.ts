import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: 'login',
    component: fromContainers.LoginComponent,
  },
  {
    path: 'register',
    redirectTo: 'register/'
  },
  {
    path: 'register/:email',
    component: fromContainers.RegisterComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AuthenticationRoutingModule {
}
