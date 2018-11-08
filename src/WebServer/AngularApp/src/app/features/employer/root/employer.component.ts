import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoggerService} from 'src/app/core';
import {NotificationService} from 'src/app/shared/notifications';
import {EmployerService} from '../services/employer.service';
import {Employer} from 'src/app/models/employer.model';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {
  employer: Observable<Employer>;
  employerId: string;

  constructor(
    private route: ActivatedRoute,
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _employerService: EmployerService
  ) {}

  async ngOnInit() {
    this.employerId = this.route.snapshot.params['employerId'];

    this.employer = this._employerService.getOne(this.employerId);
  }
  async getEmployer() {
    return this._employerService.getOne(this.employerId).subscribe(
      res => {
        this._logger.info('EMPLOYER: ', res);
        // this.employer = res;
      },
      error => {
        this._logger.error('error getting employer', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }
}
