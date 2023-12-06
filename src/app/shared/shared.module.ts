import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { CardComponent } from './components/card/card.component';
import { HeaderItemComponent } from './components/header-item/header-item.component';
import { ListTrackComponent } from './components/list-track/list-track.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoImagePipe } from './pipes/no-image.pipe';
import { AuthService } from './services/auth.service';
import { SpotifyService } from './services/spotify.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FavoriteService } from './services/favorite.service';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';

@NgModule({
  declarations: [
    NavbarComponent,
    LoadingComponent,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
    ListTrackComponent,
    AuthModalComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatIconModule,
  ],
  exports: [
    NavbarComponent,
    LoadingComponent,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
    ListTrackComponent,
    ConfirmDialogComponent,
  ],
  providers: [
    AuthService,
    SpotifyService,
    FavoriteService,
    UniversalDeviceDetectorService,
  ],
})
export class SharedModule {}
