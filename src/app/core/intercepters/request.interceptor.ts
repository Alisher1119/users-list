import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private readonly apiUrl = environment.api_url;

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone({url: `${this.apiUrl}/${request.url}`});
    return next.handle(req);
  }
}
