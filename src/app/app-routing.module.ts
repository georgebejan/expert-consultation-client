import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { AuthenticationLayoutComponent } from '@app/shared/containers/authentication-layout/authentication-layout.component';
import { ApplicationLayoutComponent } from '@app/shared/containers/application-layout/application-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './authentication/authentication.module#AuthenticationModule',
      }
    ]
  },
  {
    path: '',
    component: ApplicationLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
      },
      {
        path: 'documents',
        loadChildren: './documents/documents.module#DocumentsModule',
      },
    ]
  },
  {
    path: '**/**',
    redirectTo: '/dashboard',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
