
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
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

import { ListComponent } from './components/list/list.component';
import { ListAlbumTrackComponent } from './components/list-album-track/list-album-track.component';
import { HeaderprofileComponent } from './components/header/headerprofile/headerprofile.component';
import { HeaderalbumComponent } from './components/header/headeralbum/headeralbum.component';
import { HeaderArtistComponent } from './components/header/header-artist/header-artist.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    DomseguroPipe,
    ListComponent,
    ListAlbumTrackComponent,
    HeaderprofileComponent,
    HeaderalbumComponent,
    HeaderArtistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot( ROUTES),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    SpotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

