import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent, AddUsersCsvComponent, AddUsersExcelComponent, UsersComponent } from './containers';
import { UsersGuard } from '@app/users/guards';
import { AuthenticationGuard } from '@app/shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [
      UsersGuard,
      AuthenticationGuard
    ],
  },
  {
    path: 'add',
    component: AddUserComponent
  },
  {
    path: 'add/excel',
    component: AddUsersExcelComponent
  },
  {
    path: 'add/csv',
    component: AddUsersCsvComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UsersRoutingModule {
}
