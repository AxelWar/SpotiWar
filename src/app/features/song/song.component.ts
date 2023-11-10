import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { emptyAlbum } from 'src/app/shared/mocks/album.mock';
import { SpotifyService } from '../../shared/services/spotify.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
})
export class SongComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  loading = false;
  album: Album = emptyAlbum;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService
  ) {
    this.loading = true;
    const albumId = this.route.snapshot.params['id'];
    if (albumId) {
      this.getAlbum(albumId);
    } else {
      this.loading = false;
      console.error('Album ID is missing');
    }
  }

  getAlbum(id: string) {
    this.spotify
      .getAlbum(id)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(err => {
          console.error('Failed to fetch album', err);
          this.loading = false;
          return [];
        })
      )
      .subscribe(album => {
        this.album = album;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
