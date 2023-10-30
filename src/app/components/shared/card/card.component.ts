import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../interfaces/item.interface';
import { EMPTY_ITEM } from '../mocks/item.mock';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  item: Item = EMPTY_ITEM;
  @Input()
  type!: 'album' | 'artist' | 'song';
  @Output() cardClick = new EventEmitter<any>();

  onClick() {
    this.cardClick.emit(this.item);
  }
}
