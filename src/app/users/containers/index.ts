import { UsersComponent } from '@app/users/containers/users/users.component';
import { AddUsersCsvComponent } from './add-users-csv/add-users-csv.component';
import { AddUsersExcelComponent } from './add-users-excel/add-users-excel.component';
import { AddUserComponent } from './add-user/add-user.component';

export const components: any[] = [
  UsersComponent,
  AddUserComponent,
  AddUsersCsvComponent,
  AddUsersExcelComponent,
];

export * from './users/users.component';
export * from './add-users-csv/add-users-csv.component';
export * from './add-users-excel/add-users-excel.component';
export * from './add-user/add-user.component';
