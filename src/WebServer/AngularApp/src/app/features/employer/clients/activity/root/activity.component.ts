import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoggerService} from 'src/app/core';
import {NotificationService} from 'src/app/shared/notifications';
import {Observable} from 'rxjs/internal/Observable';
import {Activity} from 'src/app/models/activity.model';
import {ActivityService} from '../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activity: Observable<Activity>;
  employerId: string;
  clientId: string;
  activityId: string;

  constructor(
    private route: ActivatedRoute,
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _activityService: ActivityService
  ) {}

  async ngOnInit() {
    this.employerId = this.route.snapshot.params['employerId'];
    this.clientId = this.route.snapshot.params['clientId'];
    this.activityId = this.route.snapshot.params['activityId'];

    this.activity = this._activityService.getOne(this.activityId);
  }
  async getActivity() {
    return this._activityService.getOne(this.activityId).subscribe(
      res => {
        this._logger.info('ACTIVITY: ', res);
        // this.employer = res;
      },
      error => {
        this._logger.error('error getting activity', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }
}
