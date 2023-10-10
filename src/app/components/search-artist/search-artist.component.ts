import { Component} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',

})
export class SearchArtistComponent  {

  artists: any[] = [];
  loading: boolean = false;

  constructor( private spotify: SpotifyService) {  }


buscar( termino: string ) {
  console.log(termino);

  this.loading = true;
  this.spotify.getArtists( termino )
.subscribe( (data: any) => {
  this.artists = data;
  this.loading = false;
});
}

}
