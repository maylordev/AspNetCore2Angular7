import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Activity} from 'src/app/models/activity.model';
import {AbstractRestService} from 'src/app/core/http/abstractRestService.service';

@Injectable()
export class ActivityService extends AbstractRestService<Activity> {
  constructor(http: HttpClient) {
    super(http, '/api/activities');
  }
}
