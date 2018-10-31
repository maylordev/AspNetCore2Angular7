import {Component} from '@angular/core';
import {LoggerService} from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme: boolean;
  constructor(private _logger: LoggerService) {
    this._logger.info('Starting App.Component');
  }
  title = 'Bovsi Studios Timeclock';
  switchTheme(isDarkTheme: boolean) {
    this.isDarkTheme = !isDarkTheme;
    this._logger.info(`Dark Theme? ${this.isDarkTheme}`);
  }
}
