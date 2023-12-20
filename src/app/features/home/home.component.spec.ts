import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { filledAlbum } from 'src/app/shared/mocks/album.mock';
import { filledTrack } from 'src/app/shared/mocks/track.mock';
import { emptyUser, filledUser } from 'src/app/shared/mocks/user.mock';
import { SpotifyService } from 'src/app/shared/services/spotify.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let spotifyService: SpotifyService;
  let router: Router;

  beforeEach(() => {
    const routerStub = {
      navigate: jest.fn(),
    };

    const spotifyServiceStub = {
      getProfile: jest.fn(),
      getNewReleases: jest.fn(),
    };
    spotifyServiceStub.getProfile.mockReturnValue(of(filledUser));
    spotifyServiceStub.getNewReleases.mockReturnValue(of([filledAlbum]));

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: SpotifyService, useValue: spotifyServiceStub },
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`profile has default value`, () => {
    expect(component.profile).toEqual(emptyUser);
  });

  it(`tracks has default value`, () => {
    expect(component.tracks).toEqual([]);
  });

  it(`newReleases has default value`, () => {
    expect(component.newReleases).toEqual([]);
  });

  it(`displayArtist has default value`, () => {
    expect(component.displayArtist).toEqual(true);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(true);
  });

  it(`error has default value`, () => {
    expect(component.error).toEqual(false);
  });

  it('should fetch profile data from SpotifyService', fakeAsync(() => {
    fixture.detectChanges(); // Trigger ngOnInit

    // Simulate passage of time until all asynchronous operations complete
    tick();

    expect(spotifyService.getProfile).toHaveBeenCalled();
    expect(component.profile).toEqual(filledUser);
    expect(component.loading).toBeFalsy();
  }));

  it('should fetch new releases from SpotifyService', fakeAsync(() => {
    fixture.detectChanges(); // Trigger ngOnInit

    // Simulate passage of time until all asynchronous operations complete
    tick();

    expect(spotifyService.getNewReleases).toHaveBeenCalled();
    expect(component.newReleases).toEqual([filledAlbum]);
    expect(component.loading).toBeFalsy();
  }));

  it('should unsubscribe when ngOnDestroy is called', () => {
    // Trigger the ngOnDestroy method
    component.ngOnDestroy();

    // Assert that the unsubscribe$ subject has been completed
    expect((component as any).unsubscribe$.isStopped).toBeTruthy();
  });

  it('should navigate to the artist page when seeArtist is called with an artist', () => {
    // Arrange
    const item: Album = filledAlbum;

    // Act
    component.seeArtist(item);

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['/artist', '0987654321']);
  });
});
