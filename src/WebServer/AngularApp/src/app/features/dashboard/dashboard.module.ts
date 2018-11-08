import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DashboardRoutingModule} from './dashboard.routing';
import {RootComponent} from './root/root.component';
import {HomeComponent} from './home/home.component';

import {SharedModule} from '../../shared/shared.module';
import {AuthGuard} from '../../auth.guard';
import {AccountHomeComponent} from './accountHome/accountHome.component';

@NgModule({
  imports: [CommonModule, FormsModule, DashboardRoutingModule, SharedModule],
  declarations: [RootComponent, HomeComponent, AccountHomeComponent],
  exports: [],
  providers: [AuthGuard]
})
export class DashboardModule {}
