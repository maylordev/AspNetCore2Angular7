import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Entity} from '../../models/entity.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export abstract class AbstractRestService<T> {
  _headers: any;
  constructor(private _httpClient: HttpClient, private _baseUrl: string) {
    this._headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public create(_item: T): Observable<T> {
    const body = JSON.stringify(_item);
    return this._httpClient.post<T>(`${this._baseUrl}`, body) as Observable<T>;
  }
  public getAll(): Observable<T[]> {
    return this._httpClient.get(this._baseUrl) as Observable<T[]>;
  }
  public deleteOne(): Observable<T> {
    return this._httpClient.delete(this._baseUrl) as Observable<T>;
  }
  public getOne(id: string): Observable<T> {
    return this._httpClient.get(`${this._baseUrl}/${id}`) as Observable<T>;
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
