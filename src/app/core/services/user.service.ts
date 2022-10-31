import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, take, throwError} from "rxjs";
import {UserModel} from "../models/user.model";
import {get} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string[];
  currentPage: number = 1;
  totalCount: number = 0;
  pageCount: number = 0;
  perPage: number = 20;

  items: Observable<UserModel[]> = new Observable<UserModel[]>();

  constructor(private http: HttpClient) {
    this.url = ['users'];
  }

  getAll(page = 1, perPage = 20) {
    const params = {
      page,
      'per-page': perPage
    }
    this.items = this.http.get<UserModel[]>(`${this.url.join('/')}`, {params})
      .pipe(
        map(res => {
          const meta = get(res, '_meta');
          this.totalCount = get(meta, 'totalCount', 0);
          this.pageCount = get(meta, 'pageCount', 0);
          this.currentPage = get(meta, 'currentPage', 1);
          this.perPage = get(meta, 'perPage', 20);

          return get(res, 'items', []).map((item: any) => UserModel.populate(item));
        }),
        catchError(this.handleError),
        take(1),
      );
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
