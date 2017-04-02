import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SpotifyService {
  url = 'https://api.spotify.com/v1/me';
  state_key : string = "spotify_auth_state";

  constructor(
    private http    : Http,
    private router  : Router
  ) { }

  login_clicked () {
    var client_id = '376fb213682447889b3407d489e310b9'; // Your client id
    var redirect_uri = 'http://localhost:4200/playlist-manager'; // Your redirect uri
    var state = this.generateRandomString(16);

    localStorage.setItem(this.state_key, state);
    var scope = 'user-read-private user-read-email';
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

  make_request(access_token : string): Promise<{}> {
      var headers = new Headers({'Authorization': 'Bearer ' + access_token});
      return this.http
                 .get(this.url, {headers : headers})
                 .toPromise()
                 .then(response => response.json())
                 .catch(this.handleError);
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

/*
ngOnInit() {
    var params = this.spotifyserv.getHashParams();
    var access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem(this.spotifyserv.state_key);
    
    if (access_token && (state == null || state !== storedState)) {
          console.log('There was an error during the authentication');
    } else {
      localStorage.removeItem(this.spotifyserv.state_key);
      if (access_token) {
        var obj = this.spotifyserv.make_request(access_token);
        console.log("Successful Request :3");
      }
    }
  }
*/