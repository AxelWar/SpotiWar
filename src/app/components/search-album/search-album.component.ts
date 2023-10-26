import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search-album',
  templateUrl: './search-album.component.html',
})
export class SearchAlbumComponent {
  albums: any[] = [];
  loading = false;

  constructor(private spotify: SpotifyService) {}

  search(searchTerm: string) {
    console.log(searchTerm);

    this.loading = true;
    this.spotify.getAlbums(searchTerm).subscribe((data: any) => {
      this.albums = data;
      this.loading = false;
    });
  }
}
