import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { SearchAlbumComponent } from './components/search-album/search-album.component';
import { SearchSongComponent } from './components/search-song/search-song.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SongComponent } from './components/song/song.component';
import { AlbumComponent } from './components/album/album.component';

export const ROUTES: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {path: 'home', component: HomeComponent },
    {path: 'search-song', component: SearchSongComponent },
    {path: 'search-song/:termino', component: SearchSongComponent },
    {path: 'searchartist', component: SearchArtistComponent },
    {path: 'searchalbum', component: SearchAlbumComponent },
    {path: 'artist/:id', component: ArtistComponent },
    {path: 'album/:id', component: AlbumComponent },
    {path: 'track/:id', component: SongComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

