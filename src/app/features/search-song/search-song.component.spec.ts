import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { filledTrack } from 'src/app/shared/mocks/track.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpotifyService } from '../../shared/services/spotify.service';
import { SearchSongComponent } from './search-song.component';

describe('SearchSongComponent', () => {
  let component: SearchSongComponent;
  let fixture: ComponentFixture<SearchSongComponent>;
  let spotifyService: SpotifyService;
  let router: Router;

  beforeEach(() => {
    const routerStub = {
      navigate: jest.fn(),
    };
    const mockActivatedRoute = {
      params: of({
        searchTerm: 'searchValue',
      }),
    };
    const spotifyServiceStub = {
      getSongs: jest.fn(),
    };
    spotifyServiceStub.getSongs.mockReturnValue(of([filledTrack]));

    TestBed.configureTestingModule({
      declarations: [SearchSongComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SpotifyService, useValue: spotifyServiceStub },
        { provide: Router, useValue: routerStub },
      ],
    });

    fixture = TestBed.createComponent(SearchSongComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should init params from route', fakeAsync(() => {
    fixture.detectChanges(); // Lifecycle hooks are called here
    tick();
    expect(spotifyService.getSongs).toHaveBeenCalledWith('searchValue');
    expect(component.loading).toBeFalsy();
  }));
});
