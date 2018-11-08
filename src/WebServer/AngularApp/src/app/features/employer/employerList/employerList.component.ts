import {Component, OnInit, ViewChild} from '@angular/core';
import {LoggerService} from 'src/app/core';
import {NotificationService} from 'src/app/shared/notifications/notificiation.service';
import {EmployerService} from '../services/employer.service';
import {Employer} from 'src/app/models/employer.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employerList.component.html',
  styles: ['./employerList.component.scss']
})
export class EmployerListComponent implements OnInit {
  employers: Employer[] = new Array<Employer>();
  displayedColumns: string[] = ['name', 'description', 'created', 'actions'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dataSource: MatTableDataSource<Employer>;
  constructor(
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _employerService: EmployerService
  ) {}

  async ngOnInit() {
    await this.getEmployers();
  }

  async getEmployers() {
    await this._employerService.getAll().subscribe(
      res => {
        this._logger.info('Employers: %o', res);
        this.employers = res;
        this.dataSource = new MatTableDataSource<Employer>(this.employers);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this._logger.error(`error getting employers`);
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

  deleteEmployer(employerId: string) {
    this._logger.info('DELETING EMPLOYER', employerId);
  }
}
