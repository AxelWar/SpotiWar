import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 
})
export class HomeComponent implements OnInit{

  nuevasCanciones: any[] = [];
loading: boolean;

  constructor( private router: Router, private spotify: SpotifyService ) {
  }

ngOnInit() {
  this.login();

  this.loading = true;
  this.spotify.getNewReleases()
  .subscribe( (data: any) => {
this.nuevasCanciones = data;
this.loading = false;
  });
}


login() {
  const currentUrl = this.router.url.split('access_token=')[1];
  const token: string = currentUrl ? currentUrl.split('&')[0] : null;
  if ( token ) {
    localStorage.setItem('auth', token);
  } else {
    this.spotify.auth();
  }
}


}
