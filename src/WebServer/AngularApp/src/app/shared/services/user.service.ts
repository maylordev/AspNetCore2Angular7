import {Injectable} from '@angular/core';
import {Response, Headers, RequestOptions} from '@angular/http';
// Add the RxJS Observable operators we need in this app.
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoggerService} from 'src/app/core';
import {NotificationService} from '../notifications/notificiation.service';

@Injectable()
export class UserService extends BaseService {
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(
    private _httpClient: HttpClient,
    private _logger: LoggerService,
    private _notif: NotificationService
  ) {
    super();
    this.loggedIn = !!localStorage.getItem('authToken');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userName: string
  ) {
    const body = JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      userName
    });
    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.post('/api/accounts', body, _headers);
  }

  login(userName, password) {
    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient
      .post('/api/Auth/login', JSON.stringify({userName, password}), _headers)
      .pipe(
        map((res: any) => {
          if (!!res.accessToken) {
            this.setAccessToken(res.accessToken, res.refreshToken);
          }
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          this._notif.show('User Logged In!');
          return true;
        })
      );
  }

  refreshAccessToken() {
    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    return this._httpClient.post(
      '/api/Auth/refreshtoken',
      JSON.stringify({accessToken, refreshToken})
    );
  }
  setAccessToken(accessToken: any, refreshToken: any) {
    localStorage.setItem('authToken', accessToken.token);
    localStorage.setItem('authTokenExpiresIn', accessToken.expiresIn);
    localStorage.setItem('refreshToken', refreshToken);
  }
  getAccessToken(): string {
    return localStorage.getItem('authToken');
  }
  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiresIn');
    localStorage.removeItem('refreshToken');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    this._logger.info('USER LOGGED OUT');
    this._notif.show('User Logged Out');
  }

  isLoggedIn() {
    this._logger.info('IS USED LOGGED IN??', this.loggedIn);
    return this.loggedIn;
  }
}
