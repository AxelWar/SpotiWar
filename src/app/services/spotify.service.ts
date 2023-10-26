import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClassTrack } from '../components/classes/track';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  token: string = '';
  searchTerm: string = '';
  favoriteSongs: any[] = [];
  favSong: string = '';
  listFavorites: any[] = [];

  constructor(private http: HttpClient) {
    console.log('Spotify Service Ready');
  }

  auth() {
    this.token = localStorage.getItem('auth') as string;
    const urlBase = 'https://accounts.spotify.com/authorize';
    const clientId = '476b04f286264f229aed7cd9acc85f7e';
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const redirectUri = encodeURIComponent('http://localhost:4200/home');
    const url = `${urlBase}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`;
    if (!this.token) {
      window.location.href = url;
    }
  }

  /*   refreshToken() {
    const clientId = '476b04f286264f229aed7cd9acc85f7e';
    const clientSecret = '1a7db45b6582437ab4b23a648a4bc903';
    const url = `https://bootcamp-token-master.herokuapp.com/spotify/${clientId}/${clientSecret}`;
    this.http.get(url).subscribe((data: any) => {
      localStorage.setItem('auth', data.access_token);
    });
 } */

  getUrl(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    this.token = localStorage.getItem('auth') as string;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getUrl('browse/new-releases').pipe(
      map((data: any) => data.albums.items)
    );
  }

  getArtists(searchTerm: string) {
    return this.getUrl(`search?q=${searchTerm}&type=artist&market=AR`).pipe(
      map((data: any) => data.artists.items)
    );
  }
  getArtist(id: string) {
    return this.getUrl(`artists/${id}`);
  }

  getAlbumArtist(id: string) {
    return this.getUrl(`artists/${id}/albums`);
  }

  getSongAlbum(id: string) {
    return this.getUrl(`albums/${id}/tracks`);
  }

  getAlbums(searchTerm: string) {
    return this.getUrl(`search?q=${searchTerm}&type=album&market=AR`).pipe(
      map((data: any) => data.albums.items)
    );
  }
  getAlbum(id: string) {
    return this.getUrl(`albums/${id}`);
  }

  getSongs(searchTerm: string) {
    return this.getUrl(`search?q=${searchTerm}&type=track&market=AR`).pipe(
      map((data: any) => data.tracks.items)
    );
  }

  getSong(id: string) {
    return this.getUrl(`tracks/${id}`).pipe(map((data: ClassTrack) => data));
  }
  setFavorite(favSong: string) {
    this.favoriteSongs = JSON.parse(localStorage.getItem('favs') as string);
    // tslint:disable-next-line: prefer-for-of

    return !!this.favoriteSongs.find((song) => song === favSong);

    /*   for (let i = 0 ; i < this.favoriteSongs.length; i++) {
    if ( this.favoriteSongs[i] === favSong ) {
      return true;
    }
  } */
  }

  getProfile() {
    return this.getUrl('me').pipe(map((data: any) => data));
  }

  getAll(searchTerm: string) {
    return this.getUrl(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=track%2Cartist%2Calbum&market=AR`
    ).pipe(map((data: any) => data.type.items));
  }
  getFavorites() {
    this.listFavorites = JSON.parse(localStorage.getItem('favs') as string);
    return console.log(this.listFavorites);
  }
  setFavoriteSongs(favSong: string) {
    this.favoriteSongs = JSON.parse(localStorage.getItem('favs') as string);
    this.favoriteSongs.push(favSong);
    const filteredArray = this.favoriteSongs.filter(
      (valor, index, array) => array.indexOf(valor) === index
    );
    this.favoriteSongs = filteredArray;
    localStorage.setItem('favs', JSON.stringify(this.favoriteSongs));
  }

  removeFavorite(favSong: string) {
    this.favoriteSongs = JSON.parse(localStorage.getItem('favs') as string);
    for (let i = 0; i < this.favoriteSongs.length; i++) {
      if (this.favoriteSongs[i] === favSong) {
        this.favoriteSongs.splice(i, 1);
        localStorage.setItem('favs', JSON.stringify(this.favoriteSongs));
      }
    }
  }
}
