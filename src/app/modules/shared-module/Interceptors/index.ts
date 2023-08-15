import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from './request.interceptor';
import {JsonParser, JsonResponseInterceptor} from './json-response.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  {
    provide: JsonParser ,
    useClass: JsonResponseInterceptor,
    multi: true,
  },
];
