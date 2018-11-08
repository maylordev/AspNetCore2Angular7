import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimeTrackerComponent} from './components/timeTracker/timeTracker.component';
import {AuthGuard} from 'src/app/auth.guard';

const timeTrackerRoutes: Routes = [
  {
    path: 'timeclock',
    component: TimeTrackerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(timeTrackerRoutes)],
  exports: [RouterModule]
})
export class TimeTrackerRoutingModule {}
