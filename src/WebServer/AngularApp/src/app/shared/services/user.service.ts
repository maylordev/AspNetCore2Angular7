import {Injectable} from '@angular/core';
import {Response, Headers, RequestOptions} from '@angular/http';

// Add the RxJS Observable operators we need in this app.
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService extends BaseService {
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private _httpClient: HttpClient) {
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
    location: string
  ) {
    const body = JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      location
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
            localStorage.setItem('authToken', res.accessToken.token);
            localStorage.setItem(
              'authTokenExpiresIn',
              res.accessToken.expiresIn
            );
          }
          localStorage.setItem('refreshToken', res.refreshToken);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiresIn');
    localStorage.removeItem('refreshToken');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
