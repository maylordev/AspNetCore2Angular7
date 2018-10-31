import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-mat-snack-bar',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(public snackBar: MatSnackBar) {}

  // this function will open up snackbar on top right position with custom background color (defined in css)
  openSnackBar(
    message: string,
    action: string,
    className: string,
    duration: number = 3000
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      panelClass: [className]
    });
  }
}
