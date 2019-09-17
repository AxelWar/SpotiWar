import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerprofile',
  templateUrl: './headerprofile.component.html',

})
export class HeaderprofileComponent {
  @Input() items: any;
  loading: boolean;


  constructor( private router: Router ) {
               }




}
