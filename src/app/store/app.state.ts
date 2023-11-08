import { Album } from '../components/shared/interfaces/album.interface';
import { Artist } from '../components/shared/interfaces/artist.interface';
import { Track } from '../components/shared/interfaces/track.interface';
import { User } from '../components/shared/interfaces/user.interface';

export interface AppState {
  spotify: SpotifyState;
}

export interface SpotifyState {
  selectedArtist: any;
  token: string;
  newReleases: Album[];
  currentArtist: Artist;
  artistAlbums: Album[];
  currentAlbum: Album;
  searchResults: Track[];
  currentTrack: Track;
  userProfile: User;
  favoriteTracks: string[];
  error: any;
}
