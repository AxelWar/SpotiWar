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


  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService,
              private router: Router) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.getAlbum( params ['id']);
        });
  }

  getAlbum( id: string ) {
    this.spotify.getAlbum (id)
    .subscribe( album => {
      this.album = album;
      this.loading = false;
    });

  }

}
