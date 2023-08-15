import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';

export abstract class JsonParser {
  abstract parse(text: string): any;
}
@Injectable()
export class JsonResponseInterceptor implements HttpInterceptor {

  constructor(private jsonParser: JsonParser) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.responseType === 'json') {
      // If the expected response type is JSON then handle it here.
      return this.handleJsonResponse(request, next);
    } else {
      return next.handle(request);
    }
  }
  private handleJsonResponse(httpRequest: HttpRequest<any>, next: HttpHandler) {
    // Override the responseType to disable the default JSON parsing.
    httpRequest = httpRequest.clone({responseType: 'text'});
    // Handle the response using the custom parser.
    return next.handle(httpRequest).pipe(map(event => this.parseJsonResponse(event)));
  }

  private parseJsonResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse && typeof event.body === 'string') {
      return event.clone({body: this.jsonParser.parse(event.body)});
    } else {
      return event;
    }
  }
}
