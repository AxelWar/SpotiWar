import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared.module';
import { FavoriteService } from './favorite.service';
import { SpotifyService } from './spotify.service';
import { of } from 'rxjs';
import { filledTrack } from '../mocks/track.mock';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let spotifyService: SpotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteService, SpotifyService],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    });
    service = TestBed.inject(FavoriteService);
    spotifyService = TestBed.inject(SpotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle favorite correctly', () => {
    const songId = '1';
    expect(service.isFavorite(songId)).toBe(false);

    service.toggleFavorite(songId);
    expect(service.isFavorite(songId)).toBe(true);

    service.toggleFavorite(songId);
    expect(service.isFavorite(songId)).toBe(false);
  });

  it('should add favorite correctly', () => {
    const songId = '1';
    service.addFavorite(songId);
    expect(service.isFavorite(songId)).toBe(true);
  });

  it('should remove favorite correctly', () => {
    const songId = '1';
    service.addFavorite(songId);
    expect(service.isFavorite(songId)).toBe(true);

    service.removeFavorite(songId);
    expect(service.isFavorite(songId)).toBe(false);
  });

  it('should return an empty array if there are no favorite songs', () => {
    jest.spyOn(service, 'getFavoriteSongs').mockReturnValue([]);
    const result = service.getFavoriteTracks().toPromise();
    expect(result).resolves.toEqual([]);
  });

  it('should return favorite tracks correctly', () => {
    const favoriteIds = [
      '25acPaiXHLDXAJKnOS97AA',
      '5ktB9kTVHGFSMdJ2G0WdhN',
      '7bywjHOc0wSjGGbj04XbVi',
    ];

    // Mocking getFavoriteSongs to return the predefined favoriteIds
    jest.spyOn(service, 'getFavoriteSongs').mockReturnValue(favoriteIds);

    // Mocking the getSong function of SpotifyService
    jest
      .spyOn(spotifyService, 'getSong')
      .mockImplementation((id: string) => of(filledTrack));

    const result = service.getFavoriteTracks().toPromise();
    expect(result).resolves.toEqual([filledTrack]);
  });
});
