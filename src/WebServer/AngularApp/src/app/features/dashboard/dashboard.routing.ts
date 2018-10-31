import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {RootComponent} from './root/root.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '../../auth.guard';
import {AccountHomeComponent} from './accountHome/accountHome.component';

export const DasboardRouting: ModuleWithProviders = RouterModule.forChild([
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
]);
