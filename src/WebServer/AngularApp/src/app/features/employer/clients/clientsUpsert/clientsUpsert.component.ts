import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from 'src/app/shared/notifications';
import {LoggerService} from 'src/app/core';
import {Client} from 'src/app/models/client.model';
import {ClientsService} from 'src/app/features/timeTracker/services/clients.service';

@Component({
  selector: 'app-client-upsert',
  templateUrl: './clientsUpsert.component.html',
  styleUrls: ['./clientsUpsert.component.scss']
})
export class ClientsUpsertComponent implements OnInit {
  clientUpsertForm: FormGroup;
  client: Client;
  clientId: string;
  type: string;
  pageAction: string;
  constructor(
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _logger: LoggerService,
    private _notif: NotificationService,
    private _clientService: ClientsService
  ) {
    this.clientUpsertForm = this._fb.group({
      clientName: [null, Validators.required],
      clientDescription: [
        null,
        Validators.compose([Validators.maxLength(500)])
      ],
      employerId: [null, Validators.required]
    });
  }

  async ngOnInit() {
    this.clientId = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.data['type'];

    if (this.type === 'update') {
      this.pageAction = 'Update';
      await this.getClientForEdit();
    } else if (this.type === 'create') {
      this.pageAction = 'Create';
    }
  }

  async getClientForEdit() {
    await this._clientService.getOne(this.clientId).subscribe(
      res => {
        this.client = res;
        this._logger.info('CLIENT: ', this.client);
        this.clientUpsertForm.setValue({
          clientName: this.client.name,
          clientDescription: this.client.description,
          employerId: this.client.employerId
        });
      },
      error => {
        this._logger.error('error submitting client', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }
  submitForm() {
    this._logger.info(this.clientUpsertForm);
    this.client = this.getSubmitObject();
    this._clientService.create(this.client).subscribe(
      res => {
        this._logger.info(`submitted client: `, res);
        this._notif.showSuccess('Client Created!');
        this.resetForm();
      },
      error => {
        this._logger.error('error submitting activity', error);
        this._notif.showError(`ERROR: ${error.message}`);
      }
    );
  }

  resetForm() {
    this.clientUpsertForm.reset();
  }

  private getSubmitObject() {
    const clientName = this.clientUpsertForm.get('clientName');
    const clientDescription = this.clientUpsertForm.get('clientDescription');
    const employerId = this.clientUpsertForm.get('employerId');

    return new Client(
      clientName.value,
      clientDescription.value,
      employerId.value
    );
  }
}
