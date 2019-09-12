import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
})
export class CancionComponent  {
  loading: boolean;
  album: any = {};
  cancionAlbum: any = {};

  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService,
              private router: Router) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.getCancionAlbum( params ['id']);
      this.getAlbum( params ['id']);
      
    });
  }

  
  getAlbum( id: string ) {
    this.spotify.getAlbum (id)
    .subscribe( album => {
      console.log(album);
      this.album = album;
      this.loading = false;
    });

  }
  getCancionAlbum( id: string ) {
    this.spotify.getCancionAlbum (id)
    .subscribe( cancionAlbum => {
      console.log(cancionAlbum);
      this.cancionAlbum = cancionAlbum;
      this.loading = false;
    });

  }
  
}
