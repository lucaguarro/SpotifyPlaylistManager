import { SongsService } from './shared/songs.service';
import { Hash_Parameters } from './shared/Hash_Parameters.model';
import { SongSearchParams } from './shared/song-search-params.model';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpotifyService {
  hash_params : Hash_Parameters;
  state_key : string = "spotify_auth_state";
  user_url  : string;
  user_id   : string;
  local_playlists : Array<{}>; // make a playlist object :>
  song;
  constructor(
    private http    : Http,
    private router  : Router,
    private songsService: SongsService
  ) { }

  login_clicked () {
    var client_id = '376fb213682447889b3407d489e310b9'; // Your client id
    var redirect_uri = 'http://localhost:4200/playlist-manager'; // Your redirect uri
    var state = this.generateRandomString(16);

    localStorage.setItem(this.state_key, state);
    var scope = 'user-read-private playlist-read-collaborative playlist-read-private';
    var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
    this.router.navigate(["/"]).then(result=>{window.location.href = url;});
  }

  generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  getHashParams() {
    var params = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      params[e[1]] = decodeURIComponent(e[2]);
    }
    return new Hash_Parameters(params["access_token"], params["state"]);
  }

  get_uid (access_token : string) {
      var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
      var url = 'https://api.spotify.com/v1/me';
      this.http.get(url, {headers : headers})
                 .toPromise()
                 .then(response => {this.user_id = response.json().id; console.log(this.user_id)})
                 .catch(this.handleError);

  }

  searchTrack(searchParams: SongSearchParams, callback, type='track'){
    var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
    this.user_url = "https://api.spotify.com/v1/search?query="+searchParams.artist+' '+searchParams.title+"&offset=0&limit=1&type="+type+"&market=US";
    return this.http.get(this.user_url, {headers : headers})
      .subscribe(callback);

     // .map(res => res.json());
    /*return this.http
                .get(this.user_url, {headers : headers})
                .toPromise()
                .then(res => res.json().items)
                .catch(this.handleError);*/
  }

  /*searchTrack2(searchParams: SongSearchParams, type='track'){
    var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
    this.user_url = "https://api.spotify.com/v1/search?query="+searchParams.artist+' '+searchParams.title+"&offset=0&limit=1&type="+type+"&market=US";
    return new Promise((resolve, reject) => {

    })
  }*/

  get_playlist (access_token) {
    var headers = new Headers({'Authorization': 'Bearer ' + access_token});
    this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists";
    var obj = this.http
                  .get(this.user_url, {headers : headers})
                  .toPromise()
                  .then(response => this.local_playlists = response.json().items)
                  .catch(this.handleError);
    setTimeout(() => { console.log(this.local_playlists); }, 1000);
  }

  create_playlist (access_token, playlistName: String){
    var header = new Headers({'Authorization': 'Bearer ' + access_token});
    this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}