import {AbstractRestService} from '../../../core/http/abstractRestService.service';
import {Injectable} from '@angular/core';
import {Activity} from '../models/activity.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Client} from '../models/client.model';

@Injectable()
export class ClientsService extends AbstractRestService<Client> {
  constructor(http: HttpClient) {
    super(http, '/api/clients/');
  }
}
