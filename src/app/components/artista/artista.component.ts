import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
})
export class ArtistaComponent  {
  loading: boolean;
  artista: any = {};
  albumArtista: any = {};


  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService,
              private router: Router) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.getArtista( params ['id']);
      this.getAlbumArtista( params ['id']);
    });
  }

  getArtista( id: string ) {
    this.spotify.getArtista (id)
    .subscribe( artista => {
      console.log(artista);
      this.artista = artista;
      this.loading = false;
    });

  }

  getAlbumArtista( id: string ) {
    
    this.spotify.getAlbumArtista ( id )
    .subscribe( albumArtista => {
      console.log( albumArtista );
      this.albumArtista = albumArtista;
    });
}

verCancionesAlbum( album: any ) {

  let albumId;

  if ( album.type === 'album' ) {
    albumId = album.id;
  } else {
    albumId = album.album[0].id;
  }

  this.router.navigate([ '/track', albumId ]);

}
}
