import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {LoggerService} from '../core/logger/logger.service';
import {NotificationService} from '../shared/notifications/notificiation.service';
import {NotifStyle} from '../shared/notifications/notifStyle.enum';
import {errorHandler} from '@angular/platform-browser/src/browser';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class BearerInterceptService implements HttpInterceptor {
  constructor(
    private _logger: LoggerService,
    private _notif: NotificationService
  ) {}

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      }
    });

    this._logger.info('----request----');

    this._logger.info(request);

    this._logger.info('--- end of request---');

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this._logger.info(`Request Status: ${event.status}`);
            // shows success snackbar with green background
            // this._notification.openSnackBar(
            //   event.statusText,
            //   'Close',
            //   'green-snackbar'
            // );
          }
        },
        error => {
          this._logger.info('----response----');
          this._logger.error(`Response Status: ${error.status}`);
          this._logger.error(`Response Error Message: ${error.message}`);
          if (error.error.length > 0) {
            error.error.forEach(err => {
              this._logger.error(`Error: `, error.error);

              // show error snackbar with red background
              this._notif.show(
                err.description,
                'Close',
                null,
                NotifStyle.ERROR
              );
            });
          }
          this._logger.info('--- end of response---');
        }
      )
    );
  }
}
