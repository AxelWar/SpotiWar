import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Artist } from '../interfaces/artist.interface';
import { User } from '../interfaces/user.interface';
import { filledTrack } from '../mocks/track.mock';
import { AuthService } from './auth.service';
import { SpotifyService } from './spotify.service';
import { Album } from '../interfaces/album.interface';
import { Track } from '../interfaces/track.interface';

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

  it('should handle HTTP errors for getArtist', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    spotifyService.getArtist('1').subscribe(
      () => {},
      error => {
        expect(error.message).toContain('An error occurred');
      }
    );
  });

  it('should get artist correctly', () => {
    const mockArtistResponse = { id: '1', name: 'Artist 1' } as Artist;

    httpClientSpy.get.mockReturnValue(of(mockArtistResponse));

    spotifyService.getArtist('1').subscribe(artist => {
      expect(artist.id).toBe('1');
      expect(artist.name).toBe('Artist 1');
    });
  });

  it('should handle HTTP errors for getSongs', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    spotifyService.getSongs('test').subscribe(
      () => {},
      error => {
        expect(error.message).toContain('An error occurred');
      }
    );
  });

  it('should get songs correctly', () => {
    const mockTracksResponse = {
      tracks: { items: [filledTrack] },
    };

    httpClientSpy.get.mockReturnValue(of(mockTracksResponse));

    spotifyService.getSongs('test').subscribe(tracks => {
      expect(tracks.length).toBe(1);
      expect(tracks[0].id).toBe('1');
      expect(tracks[0].name).toBe('Track 1');
    });
  });

  it('should handle HTTP errors for getProfile', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    spotifyService.getProfile().subscribe(
      () => {},
      error => {
        expect(error.message).toContain('An error occurred');
      }
    );
  });

  it('should get profile correctly', () => {
    const mockUserResponse = { id: '1', display_name: 'User 1' } as User;

    httpClientSpy.get.mockReturnValue(of(mockUserResponse));

    spotifyService.getProfile().subscribe(user => {
      expect(user.id).toBe('1');
      expect(user.display_name).toBe('User 1');
    });
  });

  it('should get album correctly', () => {
    const mockAlbumResponse = { id: '1', name: 'Album 1' } as Album;

    httpClientSpy.get.mockReturnValue(of(mockAlbumResponse));

    spotifyService.getAlbum('1').subscribe(album => {
      expect(album.id).toBe('1');
      expect(album.name).toBe('Album 1');
    });
  });

  it('should handle HTTP errors for getArtistsAlbums', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    spotifyService.getArtistsAlbums('1').subscribe(
      () => {},
      error => {
        expect(error.message).toContain('An error occurred');
      }
    );
  });

  it('should handle HTTP errors for getSong', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    spotifyService.getSong('1').subscribe(
      () => {},
      error => {
        expect(error.message).toContain('An error occurred');
      }
    );
  });

  it('should get song correctly', () => {
    const mockTrackResponse = { id: '1', name: 'Track 1' } as Track;

    httpClientSpy.get.mockReturnValue(of(mockTrackResponse));

    spotifyService.getSong('1').subscribe(track => {
      expect(track.id).toBe('1');
      expect(track.name).toBe('Track 1');
    });
  });

  it('should handle HTTP errors for getNewReleases', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });
});
