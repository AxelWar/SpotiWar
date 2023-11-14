import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Album } from '../../interfaces/album.interface';
import { Track } from '../../interfaces/track.interface';
import { FavoriteService } from '../../services/favorite.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.component.html',
  styleUrls: ['./list-track.component.scss'],
})
export class ListTrackComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  dataSource = new MatTableDataSource<Track>();

  @Input() set tracks(value: Observable<Track[]>) {
    value.subscribe((tracks: Track[]) => {
      this.dataSource.data = tracks;
      this.setupSorting();
    });
  }
  @Input() manageOwnRefresh: boolean = false;
  @Input() displayArtist: boolean = false;
  @Input() showUnfavoriteGuard: boolean = false;
  displayedColumns: string[] = ['name', 'duration', 'preview', 'fav'];

  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    public dialog: MatDialog
  ) {}
  ngAfterViewInit() {
    this.setupSorting();
  }
  setupSorting() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (track: Track, property) => {
      switch (property) {
        case 'artist':
          return track.artists[0]?.name;
        case 'duration':
          return track.duration_ms;
        case 'name':
          return track.name;
        default:
          return track.name;
      }
    };
  }
  ngOnChanges() {
    if (this.displayArtist && !this.displayedColumns.includes('artist')) {
      this.displayedColumns.splice(2, 0, 'artist');
    } else if (
      !this.displayArtist &&
      this.displayedColumns.includes('artist')
    ) {
      this.displayedColumns = this.displayedColumns.filter(
        col => col !== 'artist'
      );
    }
  }

  refreshTableData(tracks: Track[]) {
    this.dataSource.data = tracks;
    if (this.dataSource.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  refreshFavorites() {
    this.favoriteService.getFavoriteTracks().subscribe((tracks: Track[]) => {
      this.refreshTableData(tracks);
    });
  }

  seeArtist(item: Album) {
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
}
