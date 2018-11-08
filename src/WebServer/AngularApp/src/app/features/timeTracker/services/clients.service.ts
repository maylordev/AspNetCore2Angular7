import {AbstractRestService} from '../../../core/http/abstractRestService.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from 'src/app/models/client.model';

@Injectable()
export class ClientsService extends AbstractRestService<Client> {
  constructor(http: HttpClient) {
    super(http, '/api/clients/');
  }
}
