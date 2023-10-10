import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerprofile',
  templateUrl: './headerprofile.component.html',

})
export class HeaderprofileComponent {
  @Input() items: any;
  loading: boolean = false;


  constructor( private router: Router ) {
               }




}
