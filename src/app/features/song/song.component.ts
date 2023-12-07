import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { emptyAlbum } from 'src/app/shared/mocks/album.mock';
import { SpotifyService } from '../../shared/services/spotify.service';
import { Track } from 'src/app/shared/interfaces/track.interface';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
})
export class SongComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private albumTracksSubject$ = new BehaviorSubject<Track[]>([]);
  tracks$ = this.albumTracksSubject$.asObservable();
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
    }
  }

  getAlbum(id: string) {
    this.spotify
      .getAlbum(id)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(err => {
          this.loading = false;
          return EMPTY;
        })
      )
      .subscribe(album => {
        this.album = album;
        this.albumTracksSubject$.next(album.tracks.items);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.albumTracksSubject$.complete();
  }
}
