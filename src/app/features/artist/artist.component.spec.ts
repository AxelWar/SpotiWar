import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SpotifyService } from '../../shared/services/spotify.service';
import { ArtistComponent } from './artist.component';
import { filledAlbums } from 'src/app/shared/mocks/albums.mock';
import { filledArtist } from 'src/app/shared/mocks/artist.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { filledAlbum } from 'src/app/shared/mocks/album.mock';
import { Album } from 'src/app/shared/interfaces/album.interface';

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

    const spotifyServiceStub = {
      getArtist: jest.fn(),
      getArtistsAlbums: jest.fn(),
    };
    spotifyServiceStub.getArtist.mockReturnValue(of(filledArtist));
    spotifyServiceStub.getArtistsAlbums.mockReturnValue(of(filledAlbums));

    const routerStub = {
      navigate: jest.fn(),
    };

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
    expect(spotifyService.getArtist).toHaveBeenCalledWith('someArtistId');
    expect(component.artist).toEqual(filledArtist);
    expect(component.loading).toBeFalsy();
  });

  it('should get artist albums from SpotifyService', () => {
    fixture.detectChanges(); // Lifecycle hooks are called here
    expect(spotifyService.getArtistsAlbums).toHaveBeenCalledWith(
      'someArtistId'
    );
    expect(component.albumArtist).toEqual(filledAlbums);
    expect(component.loading).toBeFalsy();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toBeFalsy();
  });

  it('should navigate to the artist page when seeArtist is called with an artist', () => {
    // Arrange
    const item: Album = filledAlbum;

    // Act
    component.seeSongsAlbum(item);

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['/track', '1234567890']);
  });
});
