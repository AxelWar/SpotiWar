import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Album } from '../../interfaces/album.interface';
import { Track } from '../../interfaces/track.interface';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.component.html',
  styleUrls: ['./list-track.component.scss'],
})
export class ListTrackComponent implements AfterViewInit, OnChanges, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @Input() tracks: Track[] = [];
  @Input() displayArtist: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource(this.tracks);
  displayedColumns: string[] = [
    'track_number',
    'name',
    'duration',
    'preview',
    'fav',
  ];
  favoriteStatus: { [trackId: string]: boolean } = {}; // Cache object
  constructor(
    private router: Router,
    private favoriteService: FavoriteService
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ... existing ngOnChanges code ...

    // Update the favorite status cache when tracks input changes
    if (changes['tracks']) {
      this.updateFavoriteStatusCache();
    }
  }

  updateFavoriteStatusCache(): void {
    this.tracks.forEach(track => {
      this.favoriteService
        .isTrackFavorite(track.id)
        .pipe(
          take(1),
          takeUntil(this.unsubscribe$) // Ensure to unsubscribe on destroy
        )
        .subscribe(isFavorite => {
          this.favoriteStatus[track.id] = isFavorite;
        });
    });
  }

  // Call this method when you need to check if a song is a favorite
  isTrackFavorite(trackId: string): Observable<boolean> {
    return this.favoriteService.isTrackFavorite(trackId);
  }

  setFavorites(trackId: string): void {
    this.isTrackFavorite(trackId)
      .pipe(take(1))
      .subscribe(isFavorite => {
        if (isFavorite) {
          this.favoriteService.removeFavorite(trackId);
        } else {
          this.favoriteService.addFavorite(trackId);
        }
      });
  }

  seeArtist(item: Album) {
    let artistId = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate(['/artist', artistId]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
