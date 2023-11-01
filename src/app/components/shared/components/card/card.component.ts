import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  item: any = {};
  @Input()
  type!: 'album' | 'artist' | 'song';
  @Output() cardClick = new EventEmitter<any>();

  onClick() {
    this.cardClick.emit(this.item);
  }
}
