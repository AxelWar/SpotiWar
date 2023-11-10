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

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.component.html',
  styleUrls: ['./list-track.component.scss'],
})
export class ListTrackComponent implements AfterViewInit, OnChanges {
  @Input() tracks: Track[] = [];
  @Input() displayArtist: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource(this.tracks);
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

    this.dataSource = new MatTableDataSource(this.tracks);
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  seeArtist(item: Album) {
    let artistId = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate(['/artist', artistId]);
  }

  checkFav(songId: string) {
    return this.favoriteService.isFavorite(songId);
  }

  checkIfFavorite(songId: string) {
    if (this.favoriteService.isFavorite(songId)) {
      this.favoriteService.removeFavorite(songId);
    } else {
      this.favoriteService.addFavorite(songId);
    }
  }
}
