import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchSongRoutingModule } from './search-song-routing.module';
import { SearchSongComponent } from './search-song.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchSongComponent],
  imports: [CommonModule, SearchSongRoutingModule, SharedModule],
})
export class SearchSongModule {}
