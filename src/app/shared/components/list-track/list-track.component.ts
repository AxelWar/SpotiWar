import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Album } from '../../interfaces/album.interface';
import { Track } from '../../interfaces/track.interface';
import { FavoriteService } from '../../services/favorite.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { emptyTrack } from '../../mocks/track.mock';

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.component.html',
  styleUrls: ['./list-track.component.scss'],
})
export class ListTrackComponent implements AfterViewInit, OnChanges, OnDestroy {
  private tracksSubscription?: Subscription;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  trackList: Track[] = [];
  currentTrack: Track = emptyTrack;
  dataSource = new MatTableDataSource<Track>();
  isMobile = false;
  displayedColumns: string[] = ['name', 'duration', 'preview', 'fav'];
  @Input() set tracks(value: Observable<Track[]>) {
    this.tracksSubscription?.unsubscribe();
    this.tracksSubscription = value.subscribe(tracks => {
      this.trackList = tracks;
      this.dataSource.data = tracks;
      this.setupSorting();
    });
  }
  @Input() manageOwnRefresh: boolean = false;
  @Input() displayArtist: boolean = false;
  @Input() showUnfavoriteGuard: boolean = false;

  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile();
    console.log(this.isMobile);
  }

  ngAfterViewInit() {
    this.setupSorting();
  }

  ngOnChanges() {
    const artistIndex = 2;
    const artistIncluded = this.displayedColumns.includes('artist');
    if (this.displayArtist && !artistIncluded) {
      this.displayedColumns.splice(artistIndex, 0, 'artist');
    } else if (!this.displayArtist && artistIncluded) {
      this.displayedColumns = this.displayedColumns.filter(
        col => col !== 'artist'
      );
    }
  }

  setupSorting() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (track, property) => {
      switch (property) {
        case 'artist':
          return track.artists[0]?.name;
        case 'duration':
          return track.duration_ms;
        default:
          return track.name;
      }
    };
  }

  playTrack(track: Track) {
    this.currentTrack = track;
  }

  refreshFavorites() {
    this.favoriteService.getFavoriteTracks().subscribe((tracks: Track[]) => {
      this.refreshTableData(tracks);
    });
  }

  refreshTableData(tracks: Track[]) {
    this.dataSource.data = tracks;
    if (this.dataSource.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  seeArtist(item: Album | Track) {
    let artistId = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate(['/artist', artistId]);
  }

  checkFav(songId: string) {
    return this.favoriteService.isFavorite(songId);
  }

  toggleFavorite(songId: string) {
    const isFav = this.checkFav(songId);
    if (isFav && this.showUnfavoriteGuard) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '550px',
        data: {
          message:
            'Are you sure you want to remove this track from your favorites?',
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.proceedWithUnfavorite(songId);
        }
      });
    } else {
      this.proceedWithUnfavorite(songId);
    }
  }

  private proceedWithUnfavorite(songId: string) {
    this.favoriteService.toggleFavorite(songId);
    if (this.manageOwnRefresh) {
      this.refreshFavorites();
    }
  }

  ngOnDestroy() {
    this.tracksSubscription?.unsubscribe();
  }
}
