import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { filledTrack } from 'src/app/shared/mocks/track.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpotifyService } from '../../shared/services/spotify.service';
import { SearchSongComponent } from './search-song.component';

describe('SearchSongComponent', () => {
  let component: SearchSongComponent;
  let fixture: ComponentFixture<SearchSongComponent>;

  beforeEach(() => {
    const mockActivatedRoute = {
      params: of({ id: 'someArtistId' }),
    };

    const spotifyServiceStub = {
      getSongs: jest.fn(),
    };
    spotifyServiceStub.getSongs.mockReturnValue(of(filledTrack));

    TestBed.configureTestingModule({
      declarations: [SearchSongComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SpotifyService, useValue: spotifyServiceStub },
      ],
    });

    fixture = TestBed.createComponent(SearchSongComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
