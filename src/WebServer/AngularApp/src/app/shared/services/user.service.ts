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
  baseUrl = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private _httpClient: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = environment.apiBaseUrl;
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

    return this._httpClient.post(this.baseUrl + '/accounts', body, _headers);
  }

  login(userName, password) {
    const _headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient
      .post(
        this.baseUrl + 'auth/login',
        JSON.stringify({userName, password}),
        _headers
      )
      .pipe(
        map((res: any) => {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  // facebookLogin(accessToken: string) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   const body = JSON.stringify({accessToken});
  //   return this.http
  //     .post(this.baseUrl + '/externalauth/facebook', body, {headers})
  //     .map(res => res.json())
  //     .map(res => {
  //       localStorage.setItem('auth_token', res.auth_token);
  //       this.loggedIn = true;
  //       this._authNavStatusSource.next(true);
  //       return true;
  //     })
  //     .catch(this.handleError);
  // }
}
