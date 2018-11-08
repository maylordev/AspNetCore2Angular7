import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Activity} from 'src/app/models/activity.model';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from 'src/app/shared/notifications';
import {LoggerService} from 'src/app/core';

import * as moment from 'moment';
import {ActivitiesService} from 'src/app/features/timeTracker/services/activities.service';

@Component({
  selector: 'app-activity-upsert',
  templateUrl: 'activityUpsert.component.html',
  styleUrls: ['./activityUpsert.component.scss']
})
export class ActivityUpsertComponent implements OnInit {
  activityUpsertForm: FormGroup;
  activity: Activity;
  activityId: string;
  type: string;
  pageAction: string;
  minDate = moment();
  maxDate = moment().add(1, 'year');
  constructor(
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _activitiesService: ActivitiesService
  ) {
    this.activityUpsertForm = this._fb.group({
      activityName: [null, Validators.required],
      activityDescription: [
        null,
        Validators.compose([Validators.maxLength(500)])
      ],
      activityDueDate: [{value: '', disabled: false}],
      clientId: [null, Validators.required]
    });

    this.activityUpsertForm.controls['activityDueDate'].setValue(
      this.currentDate()
    );
  }

  async ngOnInit() {
    this.activityId = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.data['type'];

    if (this.type === 'update') {
      this.pageAction = 'Update';
      await this.getActivityForEdit();
    } else if (this.type === 'create') {
      this.pageAction = 'Create';
    }
  }

  async getActivityForEdit() {
    await this._activitiesService.getOne(this.activityId).subscribe(
      res => {
        this.activity = res;
        this._logger.info('ACTIVITY: ', this.activity);
        this.activityUpsertForm.setValue({
          activityName: this.activity.name,
          activtyDescription: this.activity.description,
          activityDueDate: this.activity.dueDate,
          clientId: this.activity.clientId
        });
      },
      error => {
        this._logger.error('error submitting activity', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }
  submitForm() {
    this._logger.info(this.activityUpsertForm);
    this.activity = this.getSubmitObject();
    this._activitiesService.create(this.activity).subscribe(
      res => {
        this._logger.info(`submitted activity: `, res);
        this._notif.showSuccess('Activity Created!');
        this.resetForm();
      },
      error => {
        this._logger.error('error submitting activity', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }

  resetForm() {
    this.activityUpsertForm.reset();
  }

  private currentDate() {
    return moment().add(1, 'days');
  }
  private getSubmitObject() {
    const activityName = this.activityUpsertForm.get('activityName');
    const activityDescription = this.activityUpsertForm.get(
      'activityDescription'
    );
    const activityDueDate = this.activityUpsertForm.get('activityDueDate');
    const clientId = this.activityUpsertForm.get('activityDueDate');

    return new Activity(
      activityName.value,
      activityDescription.value,
      activityDueDate.value,
      clientId.value
    );
  }
}
