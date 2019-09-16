import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { Marcador } from 'src/app/classes/marcador.class';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
})
export class CancionComponent  {
  loading: boolean;
  album: any = {};
marcadores: Marcador[] = [];

  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService,
              private router: Router) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.getAlbum( params ['id']);
        });

        const nuevoMarcador = new Marcador( 'One', 'X Wembley', 'Ed Sheeran' ,252760, 'https://p.scdn.co/mp3-preview/32028b3d85964481a53e42865121ff2e38ab4acf?cid=476b04f286264f229aed7cd9acc85f7e' );
  this.marcadores.push( nuevoMarcador );
      }

  getAlbum( id: string ) {
    this.spotify.getAlbum (id)
    .subscribe( album => {
      this.album = album;
      this.loading = false;
    });

  }

}
