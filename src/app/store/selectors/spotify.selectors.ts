import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectSpotifyState = (state: AppState) => state.spotify;

export const selectNewReleases = createSelector(
  selectSpotifyState,
  spotifyState => spotifyState.newReleases
);

export const selectSelectedArtist = createSelector(
  selectSpotifyState,
  spotifyState => spotifyState.selectedArtist
);

// ... create more selectors for artist albums, selected album, search results, etc.
