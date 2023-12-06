import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';
import { SharedModule } from '../shared.module';

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
      imports: [HttpClientTestingModule, SharedModule],
      providers: [SpotifyService],
    });

    service = TestBed.inject(SpotifyService);
    httpMock = TestBed.inject(HttpTestingController);

    // Spy on the localStorage methods we want to mock
    jest.spyOn(localStorage, 'getItem').mockImplementation(mockLocalStorage.getItem);
    jest.spyOn(localStorage, 'setItem').mockImplementation(mockLocalStorage.setItem);
    jest.spyOn(localStorage, 'removeItem').mockImplementation(mockLocalStorage.removeItem);
    jest.spyOn(localStorage, 'clear').mockImplementation(mockLocalStorage.clear);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
    localStorage.clear();
    store = {}; // Reset the store
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
