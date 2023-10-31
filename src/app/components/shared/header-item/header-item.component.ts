import { Component, Input } from '@angular/core';
import { HeaderItem } from '../interfaces/header-item';
import { emptyHeaderItem } from '../mocks/header-item.mock';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.scss'],
})
export class HeaderItemComponent {
  @Input() item?: HeaderItem = emptyHeaderItem;
  @Input() loading = false;
}
