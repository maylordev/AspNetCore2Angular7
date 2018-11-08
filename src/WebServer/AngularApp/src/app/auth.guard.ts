// auth.guard.ts
import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {UserService} from './shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _user: UserService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._user.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/account/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }

    return true;
  }
}
