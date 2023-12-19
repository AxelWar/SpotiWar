import { AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'artist',
    loadChildren: () =>
      import('./features/artist/artist.module').then(m => m.ArtistModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'search-song',
    loadChildren: () =>
      import('./features/search-song/search-song.module').then(
        m => m.SearchSongModule
      ),
  },
  {
    path: 'track',
    loadChildren: () =>
      import('./features/song/song.module').then(m => m.SongModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), AppRoutingModule],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('should have a route for "/artist"', async () => {
    expect(routes).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: 'artist' })])
    );
  });

  it('should have a route for "/home"', async () => {
    expect(routes).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: 'home' })])
    );
  });

  it('should have a route for "/search-song"', async () => {
    expect(routes).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: 'search-song' })])
    );
  });

  it('should have a route for "/track"', async () => {
    expect(routes).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: 'track' })])
    );
  });
});
