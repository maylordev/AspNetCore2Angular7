import {Entity} from './entity.model';
import * as moment from 'moment';

export class Activity extends Entity {
  name: string;
  description: string;
  dueDate: Date;
  clientId: string;
  constructor(
    name: string,
    description: string,
    dueDate: Date,
    clientId: string,
    createdDate: Date = new Date()
  ) {
    super();
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.clientId = clientId;
    this.created = createdDate;
  }
}

export class ActivitySerializer {
  fromJson(json: any): Activity {
    const activity = new Activity(
      json.name,
      json.description,
      json.dueDate,
      json.clientId,
      moment(json.cookedOn, 'mm-dd-yyyy hh:mm').toDate()
    );
    return activity;
  }

  toJson(activity: Activity): any {
    return {
      id: activity.id,
      name: activity.name
    };
  }
}
