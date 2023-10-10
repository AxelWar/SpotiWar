import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',

})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  buscar ( termino:string ){
    if( termino.length == 0){
      return;
    }

    this.router.navigate(['search-song', termino]);

  }

}
