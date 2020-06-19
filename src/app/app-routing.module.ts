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
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
      }
    ]
  },
  {
    path: '',
    component: ApplicationLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule),
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
