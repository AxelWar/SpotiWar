import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-album',
  templateUrl: './header-album.component.html',
})
export class HeaderAlbumComponent {
  @Input() items: any;
  loading = false;

  constructor(private router: Router) {}
}
