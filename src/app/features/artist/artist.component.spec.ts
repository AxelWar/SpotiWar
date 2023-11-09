import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SpotifyService } from '../../shared/services/spotify.service';
import { ArtistComponent } from './artist.component';
import { filledAlbums } from 'src/app/shared/mocks/albums.mock';
import { filledArtist } from 'src/app/shared/mocks/artist.interface';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;
  let spotifyService: SpotifyService;
  let router: Router;

  beforeEach(async () => {
    // Mock ActivatedRoute
    const mockActivatedRoute = {
      params: of({ id: 'someArtistId' }), // Simulate route parameter Observable
    };

    const spotifyServiceStub = jasmine.createSpyObj('SpotifyService', [
      'getArtist',
      'getArtistsAlbums',
    ]);
    spotifyServiceStub.getArtist.and.returnValue(of(filledArtist));
    spotifyServiceStub.getArtistsAlbums.and.returnValue(of(filledAlbums));

    const routerStub = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ArtistComponent],
      providers: [
        { provide: SpotifyService, useValue: spotifyServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get artist details from SpotifyService', () => {
    fixture.detectChanges(); // Lifecycle hooks are called here
    expect(spotifyService.getArtist).toHaveBeenCalledOnceWith('someArtistId');
    expect(component.artist).toEqual(filledArtist);
    expect(component.loading).toBeFalse();
  });

  it('should get artist albums from SpotifyService', () => {
    fixture.detectChanges(); // Lifecycle hooks are called here
    expect(spotifyService.getArtistsAlbums).toHaveBeenCalledOnceWith(
      'someArtistId'
    );
    expect(component.albumArtist).toEqual(filledAlbums);
    expect(component.loading).toBeFalse();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toBeFalse();
  });
});
