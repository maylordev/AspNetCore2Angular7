import {NgModule} from '@angular/core';

import {EmployerService} from './services/employer.service';
import {EmployerListComponent} from './employerList/employerList.component';
import {EmployerRoutingModule} from './employer.routing';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployerUpsertComponent} from './employerUpsert/employerUpsert.component';
import {ClientsModule} from './clients/clients.module';
import {EmployerComponent} from './root/employer.component';
import {ClientsListComponent} from './clients/clientsList/clientsList.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    EmployerRoutingModule,
    ClientsModule
  ],
  exports: [],
  declarations: [
    EmployerComponent,
    EmployerListComponent,
    EmployerUpsertComponent,
    ClientsListComponent
  ],
  providers: [EmployerService]
})
export class EmployerModule {}
