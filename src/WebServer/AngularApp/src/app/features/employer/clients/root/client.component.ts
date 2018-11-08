import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoggerService} from 'src/app/core';
import {NotificationService} from 'src/app/shared/notifications';
import {Observable} from 'rxjs/internal/Observable';
import {ClientsService} from 'src/app/features/timeTracker/services/clients.service';
import {Client} from 'src/app/models/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client: Observable<Client>;
  employerId: string;
  clientId: string;

  constructor(
    private route: ActivatedRoute,
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _clientsService: ClientsService
  ) {}

  async ngOnInit() {
    this.clientId = this.route.snapshot.params['clientId'];
    this.employerId = this.route.snapshot.params['employerId'];

    this.client = this._clientsService.getOne(this.clientId);
  }
  async getClient() {
    return this._clientsService.getOne(this.clientId).subscribe(
      res => {
        this._logger.info('CLIENT: ', res);
        // this.employer = res;
      },
      error => {
        this._logger.error('error getting client', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }
}
