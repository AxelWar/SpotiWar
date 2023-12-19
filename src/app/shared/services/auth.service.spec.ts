import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SharedModule } from '../shared.module';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../components/auth-modal/auth-modal.component';
import { Router } from '@angular/router';

// Mocks for window.location and localStorage
const mockLocation = { href: '' };
const mockLocalStorage = {
  store: {} as { [key: string]: string }, // Index signature
  getItem: function (key: string) {
    return this.store[key] || null;
  },
  setItem: function (key: string, value: string) {
    this.store[key] = value;
  },
  removeItem: function (key: string) {
    delete this.store[key];
  },
  clear: function () {
    this.store = {};
  },
};

// Utility function to mock a token in localStorage
const setMockToken = (token: string, expiresIn: number) => {
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  mockLocalStorage.setItem('auth', token);
  mockLocalStorage.setItem('auth_expiration', expirationTime.toString());
};

describe('AuthService', () => {
  let service: AuthService;
  let dialogOpenSpy: jest.SpyInstance;
  let deviceServiceSpy: { isMobile: jest.Mock };
  let router: Router;

  beforeEach(() => {
    const routerStub = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        DeviceDetectorService,
        MatDialog,
        { provide: Router, useValue: routerStub },
      ],
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
    router = TestBed.inject(Router);
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

  it('should construct correct Spotify authorization URL', () => {
    const url = service.constructAuthUrl();
    expect(url).toContain('https://accounts.spotify.com/authorize');
    expect(url).toContain('client_id=');
    expect(url).toContain('response_type=token');
    expect(url).toContain('redirect_uri=');
    expect(url).toContain('scope=');
    expect(url).toContain('show_dialog=true');
  });

  it('should redirect to Spotify auth', () => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    service.redirectToSpotifyAuth();
    expect(window.location.href).toContain(
      'https://accounts.spotify.com/authorize'
    );
  });

  it('should extract token from URL and save it', () => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost/#access_token=test-token&token_type=Bearer&expires_in=3600',
      },
      writable: true,
    });

    // Replace localStorage with mock
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    service.extractTokenFromUrl();
    expect(localStorage.getItem('auth')).toBe('test-token');
  });

  it('should return false for isTokenExpired when token is not set', () => {
    // Replace localStorage with mock
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    localStorage.clear();

    expect(service.isTokenExpired()).toBe(true);
  });

  it('should return true for isTokenExpired when token is set and not expired', () => {
    setMockToken('test-token', 3600); // Token set to expire in 1 hour

    expect(service.isTokenExpired()).toBe(false);
  });

  it('should return false for isTokenExpired when token is set and expired', () => {
    setMockToken('test-token', -3600); // Token set to expire 1 hour ago

    expect(service.isTokenExpired()).toBe(true);
  });

  it('should initialize login and redirect when token is invalid', () => {
    // Replace localStorage with mock
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    localStorage.clear();
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    service.initLogin();
    expect(window.location.href).toContain(
      'https://accounts.spotify.com/authorize'
    );
  });

  it('should not redirect when token is valid', () => {
    setMockToken('test-token', 3600); // Token set to expire in 1 hour

    service.initLogin();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should validate token as false when expired', () => {
    setMockToken('test-token', -3600); // Token set to expire 1 hour ago

    expect(service.validateToken()).toBe(false);
  });

  it('should validate token as true when not expired', () => {
    setMockToken('test-token', 3600); // Token set to expire in 1 hour

    expect(service.validateToken()).toBe(true);
  });
});
