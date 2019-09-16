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
/* estado (favSong: string){
  this.spotify.estadoFav( favSong );

} */

}
