import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {NotificationService} from 'src/app/shared/notifications';
import {LoggerService} from 'src/app/core';
import {Client} from 'src/app/models/client.model';
import {ClientsService} from 'src/app/features/timeTracker/services/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clientsList.component.html',
  styleUrls: ['./clientsList.component.scss']
})
export class ClientsListComponent implements OnInit {
  employerId: string;
  clients: Client[] = new Array<Client>();
  displayedColumns: string[] = ['name', 'description', 'created', 'actions'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dataSource: MatTableDataSource<Client>;
  constructor(
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _clientService: ClientsService
  ) {}

  async ngOnInit() {
    await this.getClients();
  }
  async getClients() {
    await this._clientService.getAll().subscribe(
      res => {
        this._logger.info('Clients: ', res);
        this.clients = res;
        this.dataSource = new MatTableDataSource<Client>(this.clients);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this._logger.error(`error getting clients`);
        this._notif.show(`ERROR: ` + error);
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delentClient(clientId: string) {
    this._logger.info('DELETEING CLIENT', clientId);
  }
}
