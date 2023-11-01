import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchSongComponent } from './components/search-song/search-song.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SongComponent } from './components/song/song.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'search-song', component: SearchSongComponent },
  { path: 'search-song/:searchTerm', component: SearchSongComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'track/:id', component: SongComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
