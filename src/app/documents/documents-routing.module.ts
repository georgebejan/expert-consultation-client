import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromContainers from './containers';
import { DocumentsGuard } from '@app/documents/guards';
import { DocumentBreakdownGuard } from '@app/documents/guards/document-breakdown.guard';
import { AuthenticationGuard } from '@app/shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.DocumentsComponent,
    canActivate: [
      DocumentsGuard,
      AuthenticationGuard
    ],
  },
  {
    path: 'add',
    component: fromContainers.AddDocumentComponent,
  },
  {
    path: ':metadataId',
    component: fromContainers.DocumentBreakdownComponent,
    canActivate: [
      DocumentBreakdownGuard,
    ]
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
export class DocumentsRoutingModule {
}
