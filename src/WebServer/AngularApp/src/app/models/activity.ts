import {Entity} from './entity';
import * as moment from 'moment';

export class Activity extends Entity {}

export class ActivitySerializer {
  fromJson(json: any): Activity {
    const activity = new Activity();
    activity.id = json.id;
    activity.name = json.name;
    activity.dateAdded = moment(json.cookedOn, 'mm-dd-yyyy hh:mm').toDate();

    return activity;
  }

  toJson(activity: Activity): any {
    return {
      id: activity.id,
      name: activity.name
    };
  }
}
