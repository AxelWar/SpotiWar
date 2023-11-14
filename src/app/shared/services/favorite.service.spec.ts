import { TestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';
import { FavoriteService } from './favorite.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared.module';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteService],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    });
    service = TestBed.inject(FavoriteService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
