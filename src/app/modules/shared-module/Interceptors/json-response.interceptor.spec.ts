import {TestBed} from '@angular/core/testing';

import {JsonResponseInterceptor} from './json-response.interceptor';

describe('JsonResponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsonResponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsonResponseInterceptor = TestBed.inject(JsonResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
