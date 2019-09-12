import { Component} from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',

})
export class SearchComponent  {

  todos: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService) {  }


buscar( termino: string ) {
  console.log(termino);

  this.loading = true;
  this.spotify.getTodos( termino )
.subscribe( (data: any) => {
  this.todos = data;
  this.loading = false;
});
}

}
