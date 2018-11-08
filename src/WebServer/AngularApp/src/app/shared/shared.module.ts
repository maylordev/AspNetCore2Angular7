import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {RouterModule} from '@angular/router';
import {TopNavMenuComponent} from '../core/top-nav-menu/top-nav-menu.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {NotificationService} from './notifications/notificiation.service';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    CommonModule,
    MaterialModule,
    TopNavMenuComponent,
    LoadingSpinnerComponent
  ],
  providers: [NotificationService],
  declarations: [TopNavMenuComponent, LoadingSpinnerComponent]
})
export class SharedModule {}
