import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from 'src/app/shared/shared.module';
import {ClientsRoutingModule} from './clients.routing';
import {ClientsService} from './services/clients.service';
import {ClientsListComponent} from './clientsList/clientsList.component';
import {ClientsUpsertComponent} from './clientsUpsert/clientsUpsert.component';
import {ClientComponent} from './root/client.component';
import {ActivityModule} from './activity/activity.module';
import {ActivityListComponent} from './activity/activityList/activityList.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ClientsRoutingModule,
    ActivityModule
  ],
  exports: [],
  declarations: [
    ActivityListComponent,
    ClientComponent,
    ClientsUpsertComponent
  ],
  providers: [ClientsService]
})
export class ClientsModule {}
