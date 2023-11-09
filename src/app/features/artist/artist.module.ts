import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ArtistComponent],
  imports: [CommonModule, ArtistRoutingModule, SharedModule],
})
export class ArtistModule {}
