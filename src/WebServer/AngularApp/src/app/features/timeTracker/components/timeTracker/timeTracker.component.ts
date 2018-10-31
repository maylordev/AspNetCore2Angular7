import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {LoggerService} from 'src/app/core';
import {ActivitiesService} from '../../services/activities.service';
import {Activity} from '../../models/activity.model';
import {Client} from '../../models/client.model';
import {ClientsService} from '../../services/clients.service';
export interface TableElement {
  client: string;
  activity: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  weekly: number;
  notes: string;
}

const ELEMENT_DATA: TableElement[] = [
  {
    client: 'client-1',
    activity: 'Hydrogen',
    monday: 0.0,
    tuesday: 0.0,
    wednesday: 0.0,
    thursday: 0.0,
    friday: 0.0,
    saturday: 0.0,
    sunday: 0.0,
    weekly: 0.0,
    notes: ''
  },
  {
    client: 'client-2',
    activity: 'Hydrogen',
    monday: 0.0,
    tuesday: 0.0,
    wednesday: 0.0,
    thursday: 0.0,
    friday: 0.0,
    saturday: 0.0,
    sunday: 0.0,
    weekly: 0.0,
    notes: ''
  },
  {
    client: 'client-3',
    activity: 'Hydrogen',
    monday: 0.0,
    tuesday: 0.0,
    wednesday: 0.0,
    thursday: 0.0,
    friday: 0.0,
    saturday: 0.0,
    sunday: 0.0,
    weekly: 0.0,
    notes: ''
  }
];

@Component({
  selector: 'app-timetracker',
  templateUrl: './timeTracker.component.html',
  styleUrls: ['./timeTracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {
  tableIsLoaded: boolean;
  timeStep = 0.25;
  displayedColumns = [
    'client',
    'activity',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
    'weekly',
    'notes'
  ];
  clients: Client[] = new Array<Client>();
  activities: Activity[] = new Array<Activity>();
  dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);
  selection = new SelectionModel<TableElement>(true, []);
  timeTrackerForm = this.fb.group({
    client: [''],
    activity: [''],
    monday: ['', Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
    tuesday: ['', Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
    wednesday: ['', Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
    thursday: ['', Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
    friday: ['', Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
    saturday: ['', Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
    sunday: ['', Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
    weekly: [''],
    notes: ['']
    // address: this.fb.group({
    //   street: [''],
    //   city: [''],
    //   state: [''],
    //   zip: ['']
    // }),
  });
  constructor(
    private fb: FormBuilder,
    private _logger: LoggerService,
    private _activities: ActivitiesService,
    private _clients: ClientsService
  ) {}
  ngOnInit() {
    setTimeout(() => {
      this.tableIsLoaded = true;
    }, 1000);

    this.getActivities();
    this.getClients();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getActivities() {
    this._activities.getAll().subscribe(items => {
      this._logger.info(items);
      this.activities = items;
    });
  }
  getClients() {
    this._clients.getAll().subscribe(items => {
      this._logger.info(items);
      this.clients = items;
    });
  }
}
