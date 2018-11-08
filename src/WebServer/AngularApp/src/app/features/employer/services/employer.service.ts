import {Injectable} from '@angular/core';
import {AbstractRestService} from '../../../core';
import {Employer} from '../../../models/employer.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EmployerService extends AbstractRestService<Employer> {
  constructor(http: HttpClient) {
    super(http, '/api/employers');
  }
}
