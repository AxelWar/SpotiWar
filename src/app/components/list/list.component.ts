import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',

})
export class ListComponent {
  @Input() items: any[] = [];
  favSong: string;
  loading: boolean;


  constructor( private router: Router,
               private spotify: SpotifyService ) {
               }
      verArtista( item: any ) {
      let artistaId;
      if ( item.type === 'artist' ) {
        artistaId = item.id;
      } else {
        artistaId = item.artists[0].id;
      }
      this.router.navigate([ '/artist', artistaId ]);
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
