import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RootComponent} from './root/root.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '../../auth.guard';
import {AccountHomeComponent} from './accountHome/accountHome.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: RootComponent,
    canActivate: [AuthGuard],

    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'account', component: AccountHomeComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
