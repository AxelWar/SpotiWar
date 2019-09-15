import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-artist',
  templateUrl: './header-artist.component.html',

})
export class HeaderArtistComponent {
  @Input() items: any;
  loading: boolean;


  constructor( private router: Router ) {
               }




}
