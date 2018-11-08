import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'src/app/auth.guard';
import {ClientsUpsertComponent} from './clientsUpsert/clientsUpsert.component';
import {ClientsListComponent} from './clientsList/clientsList.component';
import {ClientComponent} from './root/client.component';

const clientsRoutes: Routes = [
  {
    path: 'employer/:employerId/client/:clientId',
    component: ClientComponent,
    children: [
      {
        path: 'activities',
        loadChildren: './activity/activity.module#ActivityModule'
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'employer/:employerId/clients',
    component: ClientsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client/create',
    component: ClientsUpsertComponent,
    data: {type: 'create'},
    canActivate: [AuthGuard]
  },
  {
    path: 'client/update/:id',
    component: ClientsUpsertComponent,
    data: {type: 'update'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(clientsRoutes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
