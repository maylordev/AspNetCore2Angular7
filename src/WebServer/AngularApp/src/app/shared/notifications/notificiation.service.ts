import {Subscription} from 'rxjs';
import {Injectable, OnDestroy} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';
import {SnackBarMessage} from './snackBarMessage.model';
import {NotifStyle} from './notifStyle.enum';

@Injectable()
export class NotificationService implements OnDestroy {
  private messageQueue: Array<any> = Array<any>();
  private subscription: Subscription;
  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  private isInstanceVisible = false;
  constructor(public snackBar: MatSnackBar) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  showInfo(message: string, action: string = 'Info') {
    const config = new MatSnackBarConfig();
    config.duration = 4500;
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'end';
    config.panelClass = [NotifStyle.INFO];

    this.show(message, action, config);
  }
  showSuccess(message: string, action: string = 'Yay!') {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'end';
    config.panelClass = [NotifStyle.SUCCESS];

    this.show(message, action, config);
  }
  showError(message: string, action: string = 'Whoops!') {
    const config = new MatSnackBarConfig();
    // config.duration = 3000;
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'end';
    config.panelClass = [NotifStyle.ERROR];

    this.show(message, action, config);
  }
  /**
   * Add a message
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   * @param classOverride Adds a css class on the snackbar so you can add color.
   */
  show(
    message: string,
    action?: string,
    config?: MatSnackBarConfig,
    classOverride?: NotifStyle
  ): void {
    if (!config) {
      config = new MatSnackBarConfig();
      config.duration = 5000;
      config.verticalPosition = 'bottom';
      config.horizontalPosition = 'end';
      config.panelClass = [classOverride];
    }

    const sbMessage = new SnackBarMessage();
    sbMessage.message = message;
    sbMessage.action = action;
    sbMessage.config = config;

    this.messageQueue.push(sbMessage);

    if (!this.isInstanceVisible) {
      this.showNext();
    }
  }

  private showNext() {
    if (this.messageQueue.length === 0) {
      return;
    }

    const message = this.messageQueue.shift();
    this.isInstanceVisible = true;

    this.snackBarRef = this.snackBar.open(
      message.message,
      message.action,
      message.config
    );

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.isInstanceVisible = false;
      this.showNext();
    });
  }
}
