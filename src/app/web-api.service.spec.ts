import { TestBed, inject } from '@angular/core/testing';

import { WebAPI } from './web-api.service';

describe('WebAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebAPI]
    });
  });

  it('should be created', inject([WebAPI], (service: WebAPI) => {
    expect(service).toBeTruthy();
  }));
});
