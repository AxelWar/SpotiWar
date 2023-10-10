import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-list-album-track',
  templateUrl: './list-album-track.component.html',

})
export class ListAlbumTrackComponent {
  @Input() items: any[] = [];
  favSong!: string;

  loading: boolean = false;

  constructor( private router: Router,
               private spotify: SpotifyService ) {

  }

  sort() {
    if (this.items[0].duration_ms > this.items[1].duration_ms) {
      this.items.sort((a, b)  => a.duration_ms - b.duration_ms);
    } else {
      this.items.sort((a, b)  => b.duration_ms - a.duration_ms);
    }
  }
  sortn() {
    if (this.items[0].track_number > this.items[1].track_number) {
      this.items.sort((a, b)  => a.track_number - b.track_number);
    } else {
      this.items.sort((a, b)  => b.track_number - a.track_number);
    }
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
