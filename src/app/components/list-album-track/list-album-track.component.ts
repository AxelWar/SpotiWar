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

    checkFav( favSong: string ) {
      return this.spotify.estadoFav( favSong );
      }

      checkIfFavourite( favSong: string ) {
        if (this.spotify.estadoFav( favSong ) === true) {
          this.spotify.removeFavourite( favSong );
        } else {
          this.spotify.favouriteSongs( favSong );

        }
        }

}
