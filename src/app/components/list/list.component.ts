import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',

})
export class ListComponent {
  @Input() items: any[] = [];

  loading: boolean;


  constructor( private router: Router ) {
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
            


}
