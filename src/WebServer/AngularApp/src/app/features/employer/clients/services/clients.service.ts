import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from 'src/app/models/client.model';
import {AbstractRestService} from 'src/app/core';

@Injectable()
export class ClientsService extends AbstractRestService<Client> {
  constructor(http: HttpClient) {
    super(http, '/api/clients');
  }
}
