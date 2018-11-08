import {Component, OnInit, ViewChild} from '@angular/core';
import {Activity} from 'src/app/models/activity.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivityService} from '../services/activity.service';
import {NotificationService} from 'src/app/shared/notifications';
import {LoggerService} from 'src/app/core';
import {AngularWaitBarrier} from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-activity-list',
  templateUrl: 'activityList.component.html'
})
export class ActivityListComponent implements OnInit {
  activities: Activity[] = new Array<Activity>();
  displayedColumns: string[] = ['name', 'description', 'created', 'actions'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dataSource: MatTableDataSource<Activity>;
  constructor(
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _activitiesService: ActivityService
  ) {}

  async ngOnInit() {
    await this.getActivities();
  }
  async getActivities() {
    await this._activitiesService.getAll().subscribe(
      res => {
        this._logger.info('Activities: ', res);
        this.activities = res;
        this.dataSource = new MatTableDataSource<Activity>(this.activities);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this._logger.error(`error getting activities`);
        this._notif.show(`ERROR: ` + error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteActivity(activityId: string) {
    this._logger.info('DELETING ACTIVITY', activityId);
  }
}
