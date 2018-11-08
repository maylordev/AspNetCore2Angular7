import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityUpsertComponent} from './activityUpsert/activityUpsert.component';
import {ActivityListComponent} from './activityList/activityList.component';
import {AuthGuard} from 'src/app/auth.guard';
import {ActivityComponent} from './root/activity.component';

const activityRoutes: Routes = [
  {
    path: 'employer/:employerId/client/:clientId/activity/:activityId',
    component: ActivityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activities',
    component: ActivityListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity/create',
    component: ActivityUpsertComponent,
    data: {type: 'create'},
    canActivate: [AuthGuard]
  },
  {
    path: 'activity/update/:id',
    component: ActivityUpsertComponent,
    data: {type: 'update'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(activityRoutes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {}
