import { Component, OnInit } from '@angular/core';
import { Http }    from '@angular/http';

@Component({
  selector: 'app-spotifytest',
  templateUrl: './spotifytest.component.html',
  styleUrls: ['./spotifytest.component.css']
})
export class SpotifytestComponent implements OnInit {
 
  constructor() {
  }

  ngOnInit() {
    /*
    var state_key : string = "spotify_auth_state";
    var state = this.generateRandomString(16);
    var params = this.getHashParams();
    var access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem(state_key);
    
    if (access_token && (state == null || state !== storedState)) {
          alert('There was an error during the authentication');
    } else {
      localStorage.removeItem(state_key);
      if (access_token) {
        console.log("access!");
      }
    */  
      /*
      document.getElementById('login-button').addEventListener('click', function() {
        var client_id = '376fb213682447889b3407d489e310b9'; // Your client id
        var redirect_uri = 'http://localhost:80'; // Your redirect uri

        localStorage.setItem(state_key, state);
        var scope = 'user-read-private user-read-email';
        var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);
            window.location = url;
      }, false);
    } */
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

}
class Hash_Parameters {
    access_token : string
    state        : string
    constructor(access_token, state) {
      this.access_token = access_token;
      this.state        = state;
    }
}
class Spotify_Request {
  url :string = 'https://api.spotify.com/v1/me'

  constructor (private http: Http) {}

  get_data () {
    return this.http.get(this.url);
  }
}
/*
  headers: { 'Authorization': 'Bearer ' + access_token}, 
 */