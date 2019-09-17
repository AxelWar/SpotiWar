import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchArtistaComponent } from './components/searchartista/searchartista.component';
import { SearchAlbumComponent } from './components/searchalbum/searchalbum.component';
import { SearchCancionComponent } from './components/searchcancion/searchcancion.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { CancionComponent } from './components/cancion/cancion.component';
import { AlbumComponent } from './components/album/album.component';

export const ROUTES: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {path: 'home', component: HomeComponent },
    {path: 'searchcancion', component: SearchCancionComponent },
    {path: 'searchcancion/:termino', component: SearchCancionComponent },
    {path: 'searchartista', component: SearchArtistaComponent },
    {path: 'searchalbum', component: SearchAlbumComponent },
    {path: 'artist/:id', component: ArtistaComponent },
    {path: 'album/:id', component: AlbumComponent },
    {path: 'track/:id', component: CancionComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

