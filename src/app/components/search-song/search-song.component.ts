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
  searchTerm!: string;

  constructor( private spotify: SpotifyService,
               public route: ActivatedRoute) {

                this.route.params.subscribe( params => {
                  if ( params['searchTerm']){
                    this.searchTerm = params['searchTerm'];
                    this.buscar(this.searchTerm);
                  }
                });
                }



buscar( searchTerm: string ) {
  if ( searchTerm.length == 0) {
    return;
  }
  this.loading = true;
  this.spotify.getSongs( searchTerm )
.subscribe( (data: any) => {
  this.tracks = data;
  this.loading = false;

});
}

ngOnInit() {
}

}
