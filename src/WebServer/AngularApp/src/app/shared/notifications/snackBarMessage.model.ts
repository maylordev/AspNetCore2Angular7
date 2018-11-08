import {MatSnackBarConfig} from '@angular/material';

export class SnackBarMessage {
  message: string;
  action: string = null;
  config: MatSnackBarConfig = null;
}
