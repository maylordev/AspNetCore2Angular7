import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TimeTrackerComponent} from './components/timeTracker/timeTracker.component';

export const TimeTrackerRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'timeclock',
    component: TimeTrackerComponent
  }
]);
