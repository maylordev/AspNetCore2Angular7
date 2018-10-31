import {AbstractRestService} from '../../../core/http/abstractRestService.service';
import {Injectable} from '@angular/core';
import {Activity} from '../models/activity.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ActivitiesService extends AbstractRestService<Activity> {
  constructor(http: HttpClient) {
    super(http, '/api/activities/');
  }
}
