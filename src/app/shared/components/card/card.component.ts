import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../../interfaces/album.interface';
import { emptyAlbum } from '../../mocks/album.mock';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  item: Album = emptyAlbum;
  @Input()
  type!: 'album' | 'artist' | 'song';
  @Output() cardClick = new EventEmitter<Album>();

  onClick() {
    this.cardClick.emit(this.item);
  }
}
