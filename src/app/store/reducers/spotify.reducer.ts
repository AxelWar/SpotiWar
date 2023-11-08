import { createReducer, on } from '@ngrx/store';
import * as SpotifyActions from '../actions/spotify.actions';
import { Album } from '../../components/shared/interfaces/album.interface';
import { Artist } from '../../components/shared/interfaces/artist.interface';
import { Track } from '../../components/shared/interfaces/track.interface';
import { Albums } from '../../components/shared/interfaces/albums.interface';
import { User } from '../../components/shared/interfaces/user.interface';

export interface SpotifyState {
  newReleases: Album[];
  selectedArtist: Artist | null;
  artistAlbums: Albums | null;
  selectedAlbum: Album | null;
  searchResults: Track[];
  selectedTrack: Track | null;
  userProfile: User | null;
  error: any;
}

export const initialState: SpotifyState = {
  newReleases: [],
  selectedArtist: null,
  artistAlbums: null,
  selectedAlbum: null,
  searchResults: [],
  selectedTrack: null,
  userProfile: null,
  error: null,
};

export const spotifyReducer = createReducer(
  initialState,
  on(SpotifyActions.fetchNewReleasesSuccess, (state, { albumArray }) => ({
    ...state,
    newReleases: albumArray,
    error: null,
  })),
  on(SpotifyActions.fetchNewReleasesFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
  // ...handle other success and failure actions similarly
);
