import { SongSearchParams } from './shared/song-search-params.model';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpotifyService {
  state_key : string = "spotify_auth_state";
  user_url  : string;
  user_id   : string;
  local_playlists : Array<{}>; // make a playlist object :>
  constructor(
    private http    : Http,
    private router  : Router
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
      var headers = new Headers({'Authorization': 'Bearer ' + access_token});
      var url = 'https://api.spotify.com/v1/me';
      var swag = "";
      this.http.get(url, {headers : headers})
                 .toPromise()
                 .then(response => {this.user_id = response.json().id; console.log(this.user_id)})
                 .catch(this.handleError);

  }

  get_song (access_token: string, songSearchParams: SongSearchParams){
    this.user_url = "https://api.spotify.com/v1/search?q=" + "artist:" + songSearchParams.artist + 
                    "%20" + "name:" + songSearchParams.title + "&type=track";
  }

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

class Hash_Parameters {
  access_token : string;
  state        : string;
  constructor(access_token, state) {
    this.access_token = access_token;
    this.state        = state;
  }
}