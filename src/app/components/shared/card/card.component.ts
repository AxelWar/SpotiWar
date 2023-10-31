import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../interfaces/album.interface';
import { EMPTY_ALBUM } from '../mocks/album.mock';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  item: Album = EMPTY_ALBUM;
  @Input()
  type!: 'album' | 'artist' | 'song';
  @Output() cardClick = new EventEmitter<any>();

  onClick() {
    this.cardClick.emit(this.item);
  }
}
