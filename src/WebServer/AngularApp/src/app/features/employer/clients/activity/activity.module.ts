import {NgModule} from '@angular/core';
import {ActivityUpsertComponent} from './activityUpsert/activityUpsert.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from 'src/app/shared/shared.module';
import {ActivityRoutingModule} from './activity.routing';
import {ActivityListComponent} from './activityList/activityList.component';
import {ActivityService} from './services/activity.service';
import {ActivityComponent} from './root/activity.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ActivityRoutingModule
  ],
  exports: [],
  declarations: [ActivityComponent, ActivityUpsertComponent],
  providers: [ActivityService]
})
export class ActivityModule {}
