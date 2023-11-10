import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let httpMock: HttpTestingController;

  // Mock local storage
  let store: any = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyService],
    });

    service = TestBed.inject(SpotifyService);
    httpMock = TestBed.inject(HttpTestingController);

    // Spy on the localStorage methods we want to mock
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
    localStorage.clear();
    store = {}; // Reset the store
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve favorite songs from local storage', () => {
    const dummySongs = ['song1', 'song2', 'song3'];
    // Add songs to favorites
    dummySongs.forEach(song => service.addFavorite(song));

    // Check if songs are marked as favorite
    dummySongs.forEach(song => {
      expect(service.isFavorite(song)).toBeTrue();
    });

    // 'song4' was never added, should be false
    expect(service.isFavorite('song4')).toBeFalse();

    // Remove 'song2' from favorites
    service.removeFavorite('song2');

    // 'song2' was removed, should be false
    expect(service.isFavorite('song2')).toBeFalse();
  });
});
