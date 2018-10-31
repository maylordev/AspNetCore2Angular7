import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Entity} from '../../models/entity';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export abstract class AbstractRestService<T> {
  constructor(private _httpClient: HttpClient, private _baseUrl: string) {}

  // public create(_item: T): Observable<T> {
  //   const o = JSON.stringify({item: _item});
  //   return this._httpClient
  //     .post<T>(`${this._baseUrl}/${this.endpoint}`, o)
  //     .pipe(map(this.extractData));
  // }
  public getAll(): Observable<T[]> {
    return this._httpClient.get(this._baseUrl) as Observable<T[]>;
  }
  public getOne(id: number): Observable<T> {
    return this._httpClient.get(`${this._baseUrl}${id}`) as Observable<T>;
  }

  // public update(_item: T): Observable<T> {
  //   const o: any = JSON.stringify({item: _item});

  //   return this._httpClient
  //     .put<T>(`${this._baseUrl}/${this.endpoint}/${o.id}`, o)
  //     .pipe(map(this.extractData));
  // }

  // delete(id: number) {
  //   return this._httpClient.delete(`${this._baseUrl}/${this.endpoint}/${id}`);
  // }

  private convertData(data: any): T[] {
    return data.map(item => item);
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
