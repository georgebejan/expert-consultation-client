import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromContainers from './containers';
import { InvitationResolver } from './resolvers';

const routes: Routes = [
  {
    path: 'login',
    component: fromContainers.LoginComponent,
  },
  {
    path: 'register/:code',
    component: fromContainers.RegisterComponent,
    resolve: {
      invitation: InvitationResolver,
    }
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
