import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-list-album-track',
  templateUrl: './list-album-track.component.html',

})
export class ListAlbumTrackComponent {
  @Input() items: any[] = [];
  favSong: string;

  loading: boolean;

  constructor( private router: Router,
               private spotify: SpotifyService ) {

  }
favorito( favSong: string ) {
  if ( favSong === '') {
    return;
  }
  this.spotify.favouriteSongs( favSong );

}
removeFavourite( favSong: string ) {
  this.spotify.removeFavourite( favSong );
  window.location.reload();
                }
}
