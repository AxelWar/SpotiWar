import { Component, OnInit} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './searchcancion.component.html',

})
export class SearchCancionComponent implements OnInit {

  tracks: any[] = [];
  loading: boolean;
  termino: string = '';

  constructor( private spotify: SpotifyService) {  }


  
buscar( termino: string ) {
  if(this.termino.length == 0){
    return;
  }

  this.loading = true;
  this.spotify.getCanciones( this.termino )
.subscribe( (data: any) => {
  this.tracks = data;
  this.loading = false;

});
}

ngOnInit() {
}

}
