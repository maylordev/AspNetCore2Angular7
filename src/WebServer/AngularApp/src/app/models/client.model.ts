import {Entity} from './entity.model';
import * as moment from 'moment';

export class Client extends Entity {
  name: string;
  description: string;
  employerId: string;
  constructor(
    name: string,
    description: string,
    employerId: string,
    createdDate: Date = new Date()
  ) {
    super();
    this.name = name;
    this.description = description;
    this.employerId = employerId;
    this.created = createdDate;
  }
}

export class ClientSerializer {
  fromJson(json: any): Client {
    const client = new Client(
      json.name,
      json.description,
      json.employerId,
      moment(json.cookedOn, 'mm-dd-yyyy hh:mm').toDate()
    );
    return client;
  }

  toJson(client: Client): any {
    return {
      id: client.id,
      name: client.name
    };
  }
}
