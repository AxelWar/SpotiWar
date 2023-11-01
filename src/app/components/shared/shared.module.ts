import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SafeDomPipe } from './pipes/safe-dom-pipe.pipe';
import { NoImagePipe } from './pipes/no-image.pipe';
import { CardComponent } from './components/card/card.component';
import { HeaderItemComponent } from './components/header-item/header-item.component';
import { ListTrackComponent } from './components/list-track/list-track.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoadingComponent,
    SafeDomPipe,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
    ListTrackComponent,
  ],
  imports: [CommonModule],
  exports: [
    NavbarComponent,
    LoadingComponent,
    SafeDomPipe,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
    ListTrackComponent,
  ],
})
export class SharedModule {}
