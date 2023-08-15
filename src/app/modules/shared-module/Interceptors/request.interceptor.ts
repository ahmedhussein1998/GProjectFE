import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../Services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    const httpRequest = request.clone({
      setHeaders:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    return next.handle(httpRequest);
  }
}
