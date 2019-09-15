import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token: string = null;

canciones: any[] = [];

  constructor( private http: HttpClient ) {
console.log('Spotify Service Ready');
  }

   auth() {
    this.token = localStorage.getItem('auth');
    const urlBase = 'https://accounts.spotify.com/authorize';
    const clientId = '476b04f286264f229aed7cd9acc85f7e';
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const redirectUri = encodeURIComponent('http://localhost:4200/home');
    const url = `${urlBase}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`;
    if (!this.token) {
      window.location.href = url;
    }
  }

  refreshToken() {
    const clientId = '476b04f286264f229aed7cd9acc85f7e';
    const clientSecret = '1a7db45b6582437ab4b23a648a4bc903';
    const url = `https://bootcamp-token-master.herokuapp.com/spotify/${clientId}/${clientSecret}`;
    this.http.get(url).subscribe((data: any) => {
      localStorage.setItem('auth', data.access_token);
    });
 }

  getUrl(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    this.token = localStorage.getItem('auth');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getUrl('browse/new-releases')
.pipe( map( (data: any) => data.albums.items));
  }

  getArtistas(termino: string ) {
    return this.getUrl(`search?q=${ termino }&type=artist&market=AR`)
    .pipe( map( (data: any) => data.artists.items));
}
getArtista(id: string ) {
  return this.getUrl(`artists/${ id }`);
  }

  getAlbumArtista(id: string ) {
    return this.getUrl(`artists/${ id }/albums`);
    }

getCancionAlbum(id: string ) {
  return this.getUrl(`albums/${ id }/tracks`);
}

getAlbums(termino: string ) {
  return this.getUrl(`search?q=${ termino }&type=album&market=AR`)
  .pipe( map( (data: any) => data.albums.items));
}
getAlbum(id: string ) {
return this.getUrl(`albums/${ id }`);
}

getCanciones(termino: string ) {
  
  return this.getUrl(`search?q=${ termino }&type=track&market=AR`)
  .pipe( map( (data: any) => {
                              this.canciones = data.tracks.items;
                              return data.tracks.items;
  
  }));
}

getCancion(id: string ) {
return this.getUrl(`tracks/${ id }`);
}

getPerfil() {
  return this.getUrl('me')
.pipe( map( (data: any) => data));
}

getTodos( termino: string) {
  return this.getUrl(`https://api.spotify.com/v1/search?q=${ termino }&type=track%2Cartist%2Calbum&market=AR`)
  .pipe( map( (data: any) => data.type.items));
}

}
