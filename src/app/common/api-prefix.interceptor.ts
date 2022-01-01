import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(isDevMode()) {
      request = request.clone({
        url: environment.serverUrl + request.url
      });
    }
    return next.handle(request);
  }
}
