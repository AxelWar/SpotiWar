import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
perfil: any;
  nuevasCanciones: any[] = [];
  loading = true;
error = false;
mensajeError: string;
  constructor( private router: Router,
               private spotify: SpotifyService ) {
  }

ngOnInit() {
  /* this.spotify.refreshToken(); */
  this.login();


  this.spotify.getPerfil()
  .subscribe( (data: any) => {
this.perfil = data;
console.log(data);
this.loading = false;
  }, ( errorServicio ) => {
    this.loading = false;
    this.error = true;
    console.log(errorServicio);
    this.mensajeError = errorServicio.error.error.message;
  });


  this.spotify.getNewReleases()
  .subscribe( (data: any) => {
this.nuevasCanciones = data;
this.loading = false;
  }, ( errorServicio ) => {
    this.loading = false;
    this.error = true;
    console.log(errorServicio);
    this.mensajeError = errorServicio.error.error.message;
    localStorage.removeItem('auth');
    window.location.reload();
  });
}


login() {

  const currentUrl = this.router.url.split('access_token=')[1];
  const token: string = currentUrl ? currentUrl.split('&')[0] : null;
  if ( token ) {
    localStorage.setItem('auth', token);
    setInterval(() => {
      this.spotify.refreshToken();
    }, 3000000);
  } else {
    
    this.spotify.auth();
  }

}

}



