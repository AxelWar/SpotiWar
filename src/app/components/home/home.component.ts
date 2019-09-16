import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
perfil: any;
listFavourites: any;
tracks: any[] = [];
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
  this.getFavoritos();


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
  });
}


login() {

  const currentUrl = this.router.url.split('access_token=')[1];
  const token: string = currentUrl ? currentUrl.split('&')[0] : null;
  if ( token ) {
    localStorage.setItem('auth', token);
    setInterval(() => {
      /* this.spotify.refreshToken(); */
      localStorage.removeItem('auth');
      window.location.reload();
      this.spotify.auth();
    }, 3000000);
  } else {
    this.spotify.auth();
  }

}
loginRefresh(){
  localStorage.removeItem('auth');
  this.login();
}
getFavoritos() {

  this.listFavourites = JSON.parse(localStorage.getItem('favs'));
  console.log(this.listFavourites.length);
  console.log(this.listFavourites);
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.listFavourites.length; i++ ) {
    this.spotify.getCancion(this.listFavourites[i])
    .subscribe( (data: any) => {
      this.tracks.push(data);
      console.log(this.tracks);
    });

}

}
}



