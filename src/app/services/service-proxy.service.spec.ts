import { TestBed } from '@angular/core/testing';

import { ServiceProxyService } from './service-proxy.service';

describe('ServiceProxyService', () => {
  let service: ServiceProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
