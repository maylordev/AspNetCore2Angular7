import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployerListComponent} from './employerList/employerList.component';
import {EmployerUpsertComponent} from './employerUpsert/employerUpsert.component';
import {AuthGuard} from 'src/app/auth.guard';
import {EmployerComponent} from './root/employer.component';

const employerRoutes: Routes = [
  {
    path: 'employers',
    component: EmployerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employer/:employerId',
    component: EmployerComponent,
    children: [
      {
        path: 'clients',
        loadChildren: './clients/clients.module#ClientsModule'
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'employer/create',
    component: EmployerUpsertComponent,
    data: {type: 'create'},
    canActivate: [AuthGuard]
  },
  {
    path: 'employer/update/:id',
    component: EmployerUpsertComponent,
    data: {type: 'update'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(employerRoutes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule {}
