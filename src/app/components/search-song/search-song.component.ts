import { Component, OnInit} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search-song.component.html',

})
export class SearchSongComponent implements OnInit {

  tracks: any[] = [];
  loading: boolean = false;
  termino!: string;

  constructor( private spotify: SpotifyService,
               public route: ActivatedRoute) {

                this.route.params.subscribe( params => {
                  if ( params['termino']){
                    this.termino = params['termino'];
                    this.buscar(this.termino);
                  }
                });
                }



buscar( termino: string ) {
  if ( termino.length == 0) {
    return;
  }
  this.loading = true;
  this.spotify.getCanciones( termino )
.subscribe( (data: any) => {
  this.tracks = data;
  this.loading = false;

});
}

ngOnInit() {
}

}
