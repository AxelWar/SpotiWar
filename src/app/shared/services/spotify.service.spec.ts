import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { AuthService } from './auth.service';
import { SpotifyService } from './spotify.service';

describe('SpotifyService', () => {
  let httpClientSpy: { get: jest.Mock };
  let authServiceSpy: {
    getToken: jest.Mock;
    isTokenExpired: jest.Mock;
    showAuthModal: jest.Mock;
  };
  let spotifyService: SpotifyService;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
    };

    authServiceSpy = {
      getToken: jest.fn(),
      isTokenExpired: jest.fn(),
      showAuthModal: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    spotifyService = TestBed.inject(SpotifyService);
  });

  it('should be created', () => {
    expect(spotifyService).toBeTruthy();
  });

  it('should handle HTTP errors', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    spotifyService.getNewReleases().subscribe(
      () => {},
      error => {
        expect(error.message).toContain('An error occurred');
      }
    );
  });

  it('should get new releases', () => {
    const mockAlbumsResponse = {
      albums: {
        items: [{ id: '1', name: 'Album 1' }] as Album[],
      },
    };

    httpClientSpy.get.mockReturnValue(of(mockAlbumsResponse));

    spotifyService.getNewReleases().subscribe(albums => {
      expect(albums.length).toBe(1);
      expect(albums[0].id).toBe('1');
      expect(albums[0].name).toBe('Album 1');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
