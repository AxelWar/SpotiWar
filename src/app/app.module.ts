import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
//Routes
import { ROUTES } from './app.routes';
// services
import { SpotifyService } from './services/spotify.service';
//Components
import { AppComponent } from './app.component';
import { AlbumComponent } from './components/album/album.component';
import { ArtistComponent } from './components/artist/artist.component';
import { CardsAlbumComponent } from './components/cards-album/cards-album.component';
import { CardsComponent } from './components/cards/cards.component';
import { HeaderAlbumComponent } from './components/header/header-album/header-album.component';
import { HeaderArtistComponent } from './components/header/header-artist/header-artist.component';
import { HeaderProfileComponent } from './components/header/header-profile/header-profile.component';
import { HomeComponent } from './components/home/home.component';
import { ListAlbumTrackComponent } from './components/list-album-track/list-album-track.component';
import { ListComponent } from './components/list/list.component';
import { SearchAlbumComponent } from './components/search-album/search-album.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { SearchSongComponent } from './components/search-song/search-song.component';
import { SharedModule } from './components/shared/shared.module';
import { SongComponent } from './components/song/song.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistComponent,
    CardsComponent,
    CardsAlbumComponent,
    AlbumComponent,
    SongComponent,
    SearchArtistComponent,
    SearchAlbumComponent,
    SearchSongComponent,
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
    SharedModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
