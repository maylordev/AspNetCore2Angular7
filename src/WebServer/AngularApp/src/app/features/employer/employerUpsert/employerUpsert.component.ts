import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {Employer} from 'src/app/models/employer.model';
import {NotificationService} from 'src/app/shared/notifications';
import {LoggerService} from 'src/app/core';
import {EmployerService} from '../services/employer.service';

@Component({
  selector: 'app-employer-upsert',
  templateUrl: './employerUpsert.component.html',
  styleUrls: ['./employerUpsert.component.scss']
})
export class EmployerUpsertComponent implements OnInit {
  employerUpsertForm: FormGroup;
  employer: Employer;
  employerId: string;
  type: string;
  pageAction: string;
  constructor(
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _employerService: EmployerService
  ) {
    this.employerUpsertForm = this._fb.group({
      employerName: [null, Validators.required],
      employerDescription: [
        null,
        Validators.compose([Validators.maxLength(500)])
      ]
    });
  }

  async ngOnInit() {
    this.employerId = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.data['type'];

    if (this.type === 'update') {
      this.pageAction = 'Update';
      await this.getEmployerForEdit();
    } else if (this.type === 'create') {
      this.pageAction = 'Create';
    }
  }

  async getEmployerForEdit() {
    await this._employerService.getOne(this.employerId).subscribe(
      res => {
        this.employer = res;
        this._logger.info('EMPLOYER: ', this.employer);
        this.employerUpsertForm.setValue({
          employerName: this.employer.name,
          employerDescription: this.employer.description
        });
      },
      error => {
        this._logger.error('error submitting employer', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }

  submitForm() {
    this._logger.info(this.employerUpsertForm);
    this.employer = this.getSubmitObject();
    this._employerService.create(this.employer).subscribe(
      res => {
        this._logger.info(`submitted employer: `, res);
        this._notif.showSuccess('Employer Created!');
        this.resetForm();
      },
      error => {
        this._logger.error('error submitting employer', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }

  resetForm() {
    this.employerUpsertForm.reset();
  }

  private getSubmitObject() {
    const employerName = this.employerUpsertForm.get('employerName');
    const employerDescription = this.employerUpsertForm.get(
      'employerDescription'
    );

    return new Employer(employerName.value, employerDescription.value);
  }
}
