import { Component} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './searchcancion.component.html',

})
export class SearchCancionComponent  {

  canciones: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService) {  }


buscar( termino: string ) {
  console.log(termino);

  this.loading = true;
  this.spotify.getCanciones( termino )
.subscribe( (data: any) => {
  this.canciones = data;
  this.loading = false;
});
}

}
