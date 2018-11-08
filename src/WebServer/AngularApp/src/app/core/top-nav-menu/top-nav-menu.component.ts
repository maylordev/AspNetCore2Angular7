import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output
} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {LoggerService} from '../logger/logger.service';

@Component({
  selector: 'app-top-nav-menu',
  templateUrl: './top-nav-menu.component.html',
  styleUrls: ['./top-nav-menu.component.scss']
})
export class TopNavMenuComponent implements OnInit {
  isLoggedIn: boolean;
  // isDarkTheme: boolean;
  @Output()
  changeThemeEvent = new EventEmitter<boolean>();
  isDarkTheme: boolean;
  constructor(
    private _userService: UserService,
    private _logger: LoggerService
  ) {
    this.isLoggedIn = this._userService.isLoggedIn();
  }

  ngOnInit() {}
  changeTheme(): void {
    localStorage.setItem('isDarkTheme', JSON.stringify(this.isDarkTheme));

    if (this.isDarkTheme) {
      this.isDarkTheme = false;
    } else {
      this.isDarkTheme = true;
    }

    this.changeThemeEvent.emit(this.isDarkTheme);
  }
  logout() {
    this._userService.logout();
  }
}
