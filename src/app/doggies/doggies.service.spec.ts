import { TestBed } from '@angular/core/testing';

import { DoggiesService } from './doggies.service';

describe('DoggiesService', () => {
  let service: DoggiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoggiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
