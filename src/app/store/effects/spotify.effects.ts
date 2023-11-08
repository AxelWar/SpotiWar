import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import { SpotifyService } from 'src/app/services/spotify.service';
import * as SpotifyActions from '../actions/spotify.actions'; // Assume actions are defined in a separate file

@Injectable()
export class SpotifyEffects {
  constructor(
    private actions$: Actions,
    private spotifyService: SpotifyService
  ) {}

  // Handle new releases fetching
  fetchNewReleases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotifyActions.fetchNewReleases),
      switchMap(() =>
        this.spotifyService.getNewReleases().pipe(
          map(albumArray =>
            SpotifyActions.fetchNewReleasesSuccess({ albumArray })
          ),
          catchError(error =>
            of(SpotifyActions.fetchNewReleasesFailure({ error }))
          )
        )
      )
    )
  );

  // Handle fetching a single artist
  fetchArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotifyActions.fetchArtist),
      concatMap(action =>
        this.spotifyService.getArtist(action.artistId).pipe(
          map(artist => SpotifyActions.fetchArtistSuccess({ artist })),
          catchError(error => of(SpotifyActions.fetchArtistFailure({ error })))
        )
      )
    )
  );

  // Handle fetching artist's albums
  fetchArtistAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotifyActions.fetchArtistAlbums),
      concatMap(action =>
        this.spotifyService.getArtistAlbums(action.artistId).pipe(
          map(albums => SpotifyActions.fetchArtistAlbumsSuccess({ albums })),
          catchError(error =>
            of(SpotifyActions.fetchArtistAlbumsFailure({ error }))
          )
        )
      )
    )
  );

  // Handle searching songs
  searchSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotifyActions.searchTracks),
      switchMap(action =>
        this.spotifyService.getSongs(action.searchTerm).pipe(
          map(tracks => SpotifyActions.searchTracksSuccess({ tracks })),
          catchError(error => of(SpotifyActions.searchTracksFailure({ error })))
        )
      )
    )
  );

  // Handle fetching a single song
  fetchSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotifyActions.fetchTrack),
      concatMap(action =>
        this.spotifyService.getSong(action.trackId).pipe(
          map(track => SpotifyActions.fetchTrackSuccess({ track })),
          catchError(error => of(SpotifyActions.fetchTrackFailure({ error })))
        )
      )
    )
  );
}
