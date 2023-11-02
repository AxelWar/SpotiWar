import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NoImagePipe } from './pipes/no-image.pipe';
import { CardComponent } from './components/card/card.component';
import { HeaderItemComponent } from './components/header-item/header-item.component';
import { ListTrackComponent } from './components/list-track/list-track.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NavbarComponent,
    LoadingComponent,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
    ListTrackComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
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
