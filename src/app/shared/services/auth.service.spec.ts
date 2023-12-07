import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SharedModule } from '../shared.module';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../components/auth-modal/auth-modal.component';

describe('AuthService', () => {
  let service: AuthService;
  let dialogOpenSpy: jest.SpyInstance;
  let deviceServiceSpy: { isMobile: jest.Mock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, DeviceDetectorService, MatDialog],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    });
    service = TestBed.inject(AuthService);
    dialogOpenSpy = jest.spyOn(service['dialog'], 'open');
    // Create a spy object for the DeviceDetectorService
    deviceServiceSpy = {
      isMobile: jest.fn(),
    };

    // Replace the private deviceService with the spy
    Object.defineProperty(service, 'deviceService', {
      value: deviceServiceSpy,
    });
  });

  afterEach(() => {
    // Clear all spies
    jest.restoreAllMocks();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should open AuthModalComponent when calling showAuthModal', () => {
    // Call the method
    service.showAuthModal();

    // Expect the dialog.open method to be called with the correct parameters
    expect(dialogOpenSpy).toHaveBeenCalledWith(AuthModalComponent, {
      width: '650px',
    });
  });

  it('should return true when isMobile is true', () => {
    // Mock the behavior of the isMobile method
    deviceServiceSpy.isMobile.mockReturnValue(true);

    // Call the method
    const result = service.isMobile();

    // Expect the result to be true
    expect(result).toBe(true);
  });

  it('should return false when isMobile is false', () => {
    // Mock the behavior of the isMobile method
    deviceServiceSpy.isMobile.mockReturnValue(false);

    // Call the method
    const result = service.isMobile();

    // Expect the result to be false
    expect(result).toBe(false);
  });
});
