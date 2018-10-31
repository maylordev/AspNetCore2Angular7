import {NgModule} from '@angular/core';
import {TimeTrackerComponent} from './components/timeTracker/timeTracker.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {TimeTrackerRouting} from './timeTracker.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivitiesService} from './services/activities.service';
import {ClientsService} from './services/clients.service';
@NgModule({
  imports: [SharedModule, TimeTrackerRouting, FormsModule, ReactiveFormsModule],
  declarations: [TimeTrackerComponent],
  entryComponents: [TimeTrackerComponent],
  providers: [ActivitiesService, ClientsService]
})
export class TimeTrackerModule {}
