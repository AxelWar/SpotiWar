import { createAction, props } from '@ngrx/store';
import { Album } from '../../components/shared/interfaces/album.interface';
import { Artist } from '../../components/shared/interfaces/artist.interface';
import { Track } from '../../components/shared/interfaces/track.interface';
import { User } from '../../components/shared/interfaces/user.interface';
import { Albums } from 'src/app/components/shared/interfaces/albums.interface';

// Fetching New Releases
export const fetchNewReleases = createAction(
  '[Spotify API] Fetch New Releases'
);
export const fetchNewReleasesSuccess = createAction(
  '[Spotify API] Fetch New Releases Success',
  props<{ albumArray: Album[] }>()
);
export const fetchNewReleasesFailure = createAction(
  '[Spotify API] Fetch New Releases Failure',
  props<{ error: any }>()
);

// Fetching Artist Information
export const fetchArtist = createAction(
  '[Spotify API] Fetch Artist',
  props<{ artistId: string }>()
);
export const fetchArtistSuccess = createAction(
  '[Spotify API] Fetch Artist Success',
  props<{ artist: Artist }>()
);
export const fetchArtistFailure = createAction(
  '[Spotify API] Fetch Artist Failure',
  props<{ error: any }>()
);

// Fetching Artist's Albums
export const fetchArtistAlbums = createAction(
  '[Spotify API] Fetch Artists Albums',
  props<{ artistId: string }>()
);
export const fetchArtistAlbumsSuccess = createAction(
  '[Spotify API] Fetch Artists Albums Success',
  props<{ albums: Albums }>()
);
export const fetchArtistAlbumsFailure = createAction(
  '[Spotify API] Fetch Artists Albums Failure',
  props<{ error: any }>()
);

// Fetching a Specific Album
export const fetchAlbum = createAction(
  '[Spotify API] Fetch Album',
  props<{ albumId: string }>()
);
export const fetchAlbumSuccess = createAction(
  '[Spotify API] Fetch Album Success',
  props<{ album: Album }>()
);
export const fetchAlbumFailure = createAction(
  '[Spotify API] Fetch Album Failure',
  props<{ error: any }>()
);

// Searching Tracks
export const searchTracks = createAction(
  '[Spotify API] Search Tracks',
  props<{ searchTerm: string }>()
);
export const searchTracksSuccess = createAction(
  '[Spotify API] Search Tracks Success',
  props<{ tracks: Track[] }>()
);
export const searchTracksFailure = createAction(
  '[Spotify API] Search Tracks Failure',
  props<{ error: any }>()
);

// Fetching a Specific Track
export const fetchTrack = createAction(
  '[Spotify API] Fetch Track',
  props<{ trackId: string }>()
);
export const fetchTrackSuccess = createAction(
  '[Spotify API] Fetch Track Success',
  props<{ track: Track }>()
);
export const fetchTrackFailure = createAction(
  '[Spotify API] Fetch Track Failure',
  props<{ error: any }>()
);

// Fetching User Profile
export const fetchUserProfile = createAction(
  '[Spotify API] Fetch User Profile'
);
export const fetchUserProfileSuccess = createAction(
  '[Spotify API] Fetch User Profile Success',
  props<{ user: User }>()
);
export const fetchUserProfileFailure = createAction(
  '[Spotify API] Fetch User Profile Failure',
  props<{ error: any }>()
);
