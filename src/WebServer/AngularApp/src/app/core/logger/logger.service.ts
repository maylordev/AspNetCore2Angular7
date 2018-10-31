import {Injectable} from '@angular/core';

export abstract class Logger {
  clear: any;
  info: any;
  warn: any;
  error: any;
  table: any;
}

@Injectable()
export class LoggerService implements Logger {
  clear: any;
  info: any;
  warn: any;
  error: any;
  table: any;

  invokeConsoleMethod(type: string, args?: any): void {}
}
