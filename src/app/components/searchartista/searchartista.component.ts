import { Component} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-searchartista',
  templateUrl: './searchartista.component.html',

})
export class SearchArtistaComponent  {

  artistas: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService) {  }


buscar( termino: string ) {
  console.log(termino);

  this.loading = true;
  this.spotify.getArtistas( termino )
.subscribe( (data: any) => {
  this.artistas = data;
  this.loading = false;
});
}

}
