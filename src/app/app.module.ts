import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AlbumComponent } from './components/album/album.component';
import { CancionComponent } from './components/cancion/cancion.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { TarjetasAlbumComponent } from './components/tarjetasalbum/tarjetasalbum.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { SearchArtistaComponent } from './components/searchartista/searchartista.component';
import { SearchAlbumComponent } from './components/searchalbum/searchalbum.component';
import { SearchCancionComponent } from './components/searchcancion/searchcancion.component';
// Importar Rutas
import { ROUTES } from './app.routes';

// services
import { SpotifyService } from './services/spotify.service';

// Pipes
import { NoimagePipe } from './pipes/noimage.pipe';

import { DomseguroPipe } from './pipes/domseguro.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistaComponent,
    NavbarComponent,
    NoimagePipe,
    TarjetasComponent,
    TarjetasAlbumComponent,
    LoadingComponent,
    AlbumComponent,
    CancionComponent,
    SearchArtistaComponent,
    SearchAlbumComponent,
    SearchCancionComponent,
    DomseguroPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES)
  ],
  providers: [
    SpotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
