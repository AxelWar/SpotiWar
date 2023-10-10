import { Component} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search-album',
  templateUrl: './search-album.component.html',

})
export class SearchAlbumComponent  {

  albums: any[] = [];
  loading: boolean = false;

  constructor( private spotify: SpotifyService) {  }


buscar( termino: string ) {
  console.log(termino);

  this.loading = true;
  this.spotify.getAlbums( termino )
.subscribe( (data: any) => {
  this.albums = data;
  this.loading = false;
});
}

}
