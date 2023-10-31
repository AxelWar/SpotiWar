import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../shared/interfaces/album.interface';
import { Track } from '../shared/interfaces/track.interface';
import { emptyAlbum } from '../shared/mocks/album.mock';
import { emptyTrack } from '../shared/mocks/track.mock';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
})
export class SongComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  loading = false;
  marcadores: Track[] = [emptyTrack];
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
