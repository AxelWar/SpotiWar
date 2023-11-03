import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CardComponent } from './components/card/card.component';
import { HeaderItemComponent } from './components/header-item/header-item.component';
import { ListTrackComponent } from './components/list-track/list-track.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoImagePipe } from './pipes/no-image.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    LoadingComponent,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
    ListTrackComponent,
  ],
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule],
  exports: [
    NavbarComponent,
    LoadingComponent,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
    ListTrackComponent,
  ],
})
export class SharedModule {}
