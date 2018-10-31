import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LoggerService} from '../core/logger/logger.service';
import {NotificationComponent} from '../shared/notifications/notificiation.service';

@Injectable()
export class BearerInterceptService implements HttpInterceptor {
  constructor(
    private _logger: LoggerService,
    private _notification: NotificationComponent
  ) {}

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });

    this._logger.info('----request----');

    this._logger.info(request);

    this._logger.info('--- end of request---');

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this._logger.info(' all looks good');
            // http response status code
            this._logger.info(event.status);
            // shows success snackbar with green background
            // this._notification.openSnackBar(
            //   event.statusText,
            //   'Close',
            //   'green-snackbar'
            // );
          }
        },
        error => {
          // http response status code
          this._logger.info('----response----');
          this._logger.error(`status code: ${error.status}`);
          this._logger.error(error.message);
          this._logger.info('--- end of response---');
          // show error snackbar with red background
          this._notification.openSnackBar(
            error.message,
            'Close',
            'red-snackbar',
            null
          );
        }
      )
    );
  }
}
