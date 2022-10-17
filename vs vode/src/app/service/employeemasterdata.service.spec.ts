import { TestBed } from '@angular/core/testing';

import { EmployeemasterdataService } from './employeemasterdata.service';

describe('EmployeemasterdataService', () => {
  let service: EmployeemasterdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeemasterdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
