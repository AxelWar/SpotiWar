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

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.component.html',
  styleUrls: ['./list-track.component.scss'],
})
export class ListTrackComponent implements AfterViewInit, OnChanges {
  @Input() manageOwnRefresh: boolean = false;
  @Input() set tracks(value: Observable<Track[]>) {
    value.subscribe((tracks: Track[]) => {
      this.refreshTableData(tracks);
    });
  }
  /*   @Input() set tracks(value: Observable<Track[]>) {
    value.subscribe((tracks: Track[]) => {
      this.dataSource.data = tracks;
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  } */
  @Input() displayArtist: boolean = false;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource = new MatTableDataSource<Track>();
  displayedColumns: string[] = ['name', 'duration', 'preview', 'fav'];

  constructor(
    private router: Router,
    private favoriteService: FavoriteService
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  toggleFavorite(songId: string) {
    this.favoriteService.toggleFavorite(songId);
    if (this.manageOwnRefresh) {
      this.refreshFavorites();
    }
  }

  seeArtist(item: Album) {
    let artistId = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate(['/artist', artistId]);
  }

  checkFav(songId: string) {
    return this.favoriteService.isFavorite(songId);
  }
}
