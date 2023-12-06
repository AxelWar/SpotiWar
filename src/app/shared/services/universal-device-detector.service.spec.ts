import { TestBed } from '@angular/core/testing';

import { UniversalDeviceDetectorService } from './universal-device-detector.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared.module';

describe('UniversalDeviceDetectorService', () => {
  let service: UniversalDeviceDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
    });
    service = TestBed.inject(UniversalDeviceDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
