import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token: string = null;
  



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
    if (this.token) {
      window.location.href = url;
    }
  }

  getUrl(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    this.token = localStorage.getItem('auth');
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get(url, { headers });
  }

/* getQuery( query: string ) {
        const url = `https://api.spotify.com/v1/${ query }`;
        this.token = localStorage.getItem('auth');
        const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

        return this.http.get(url, { headers });
  } */

  getNewReleases() {
    return this.getUrl('browse/new-releases')
.pipe( map( data => data['albums'].items));

  }

  getArtista(termino: string ) {
    return this.getUrl(`search?q=${ termino }&type=artist&market=AR&offset=0&limit=15`)
    .pipe( map( data => data['artists'].items));
}





/*    getToken(){
    const tokens: TokenInterface[] = [];

  let params = ('grant_type=client_credentials');
  let client_id = '476b04f286264f229aed7cd9acc85f7e'; // Your client id
  let client_secret = '1a7db45b6582437ab4b23a648a4bc903'; // Your secret
  let encoded = btoa(client_id + ':' + client_secret);
  /* const headers = new HttpHeaders();
  headers.append( 'Authorization', 'Basic ' + encoded);
  headers.append('Content-Type' , 'application/x-www-form-urlencoded'); 
  let proxy = 'https://cors-anywhere.herokuapp.com/';
  let uurl = 'https://accounts.spotify.com/api/token';

    return this.http.post(proxy + uurl, params , {headers:{Authorization:`Basic ${encoded}`,'Content-Type': 'application/x-www-form-urlencoded' }})
  .pipe( map((res: any) => {
    console.log(res);
          let data = res.json();
           return data;
           
      }));

    }   */

//resulta
/* access_token: "BQDicb7m3tP19xehFdU_MJgN4sw-X0ZSa_p9vX6tp_xCILKSLOJMkwwZfyBI6IoMuR6luhpQKh9IduQaTeg"
expires_in: 3600
scope: ""
token_type: "Bearer" */



}
/*  export interface TokenInterface {
  access_token: string;
  expires_in: number;
  scope: any;
  token_type: string;
} 
 */