import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistComponent } from './components/artist/artist.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AlbumComponent } from './components/album/album.component';
import { SongComponent } from './components/song/song.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardsAlbumComponent } from './components/cards-album/cards-album.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { SearchAlbumComponent } from './components/search-album/search-album.component';
import { SearchSongComponent } from './components/search-song/search-song.component';
// Importar Rutas
import { ROUTES } from './app.routes';

// services
import { SpotifyService } from './services/spotify.service';

// Pipes
import { NoImagePipe } from './pipes/no-image.pipe';
import { SafeDomPipe } from './pipes/safe-dom-pipe.pipe';

import { ListComponent } from './components/list/list.component';
import { ListAlbumTrackComponent } from './components/list-album-track/list-album-track.component';
import { HeaderProfileComponent } from './components/header/header-profile/header-profile.component';
import { HeaderAlbumComponent } from './components/header/header-album/header-album.component';
import { HeaderArtistComponent } from './components/header/header-artist/header-artist.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistComponent,
    NavbarComponent,
    NoImagePipe,
    CardsComponent,
    CardsAlbumComponent,
    LoadingComponent,
    AlbumComponent,
    SongComponent,
    SearchArtistComponent,
    SearchAlbumComponent,
    SearchSongComponent,
    SafeDomPipe,
    ListComponent,
    ListAlbumTrackComponent,
    HeaderProfileComponent,
    HeaderAlbumComponent,
    HeaderArtistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
