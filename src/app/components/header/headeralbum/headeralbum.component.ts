import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headeralbum',
  templateUrl: './headeralbum.component.html',

})
export class HeaderalbumComponent {
  @Input() items: any;
  loading: boolean = false;


  constructor( private router: Router ) {
               }




}
