import {AbstractRestService} from '../../../core/http/abstractRestService.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Activity} from 'src/app/models/activity.model';

@Injectable()
export class ActivitiesService extends AbstractRestService<Activity> {
  constructor(http: HttpClient) {
    super(http, '/api/activities/');
  }
}
