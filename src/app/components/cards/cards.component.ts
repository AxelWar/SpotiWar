import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from '../shared/interfaces/track.interface';
import { Tracks } from '../shared/interfaces/tracks.interface';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  @Input() items: Track[] = [];

  constructor(private router: Router) {}

  seeArtist(item: Track) {
    let artistId;
    if (item.type === 'artist') {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }
    this.router.navigate(['/artist', artistId]);
  }
}
