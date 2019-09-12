import { Component} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './searchcancion.component.html',

})
export class SearchCancionComponent  {

  tracks: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService) {  }


  
buscar( termino: string ) {
  console.log(termino);

  this.loading = true;
  this.spotify.getCanciones( termino )
.subscribe( (data: any) => {
  this.tracks = data;
  this.loading = false;
  console.log(data);
});
}

}
