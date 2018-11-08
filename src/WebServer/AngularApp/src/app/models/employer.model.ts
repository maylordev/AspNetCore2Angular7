import {Entity} from './entity.model';
import * as moment from 'moment';

export class Employer extends Entity {
  name: string;
  description: string;
  constructor(
    name: string,
    description: string,
    createdDate: Date = new Date()
  ) {
    super();
    this.name = name;
    this.description = description;
    this.created = createdDate;
  }
}

export class EmployerSerializer {
  fromJson(json: any): Employer {
    const employer = new Employer(
      json.name,
      json.description,
      moment(json.cookedOn, 'mm-dd-yyyy hh:mm').toDate()
    );

    return employer;
  }

  toJson(employer: Employer): any {
    return {
      id: employer.id,
      name: employer.name
    };
  }
}
