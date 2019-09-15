import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-album-track',
  templateUrl: './list-album-track.component.html',
  
})
export class ListAlbumTrackComponent {
  @Input() items: any[] = [];
  constructor( private router: Router ) { }
 

}
