import { Song } from './shared/song.model';
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
  playlist_id : string = "0NvZ1eA6qo1jBk1BigahyX";
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
    var scope = 'user-read-private playlist-read-collaborative playlist-read-private playlist-modify playlist-modify-private';
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

  searchTrack(searchParams: SongSearchParams, type='track'){
    var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
    this.user_url = "https://api.spotify.com/v1/search?query="+searchParams.artist+' '+searchParams.title+"&offset=0&limit=1&type="+type+"&market=US";
    return this.http.get(this.user_url, {headers : headers})
      .toPromise()
      .then(
        response => {
                var res = response.json();
                var searched_song = {artist : null, title : null, imagePath : null, spotifyID : null}
                searched_song.artist = res.tracks.items[0].artists[0].name;
                searched_song.title = res.tracks.items[0].name;
                searched_song.imagePath = res.tracks.items[0].album.images[0].url;
                searched_song.spotifyID = res.tracks.items[0].id;
                this.songsService.addSong(searched_song);
        }
      );
  }


  get_playlist () {
    var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
    this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists";
    var obj = this.http
                  .get(this.user_url, {headers : headers})
                  .toPromise()
                  .then(
                      (response) => {this.local_playlists = response.json().items;
                                  console.log(this.local_playlists);
                                  console.log(this.local_playlists[0]);
                                  for(var i = 0; i < this.local_playlists.length; i++){
                                    //if(this.local_playlists[0].name)
                                  }
                                  
                      })
                  .catch(this.handleError);
    //setTimeout(() => { console.log(this.local_playlists); }, 1000);
  }

  /*add_track_to_playlist(songID: String){
    var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
    headers.append('Accept', 'application/json');
    this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists/" + this.playlist_id + "/tracks"; //playlist_id is hardcoded rn. needs to be added dynamically
    let songIDs: String [] = [];
    songIDs.push("spotify:track:" + songID);
    let body = {"uris": songIDs};
    console.log(this.user_url);
    console.log(body);
    this.http
        .post(this.user_url, JSON.stringify(body), {headers : headers})
        .toPromise()
        .then(response => console.log(response))
        .catch(this.handleError);
  }*/

    add_tracks_to_playlist(){
      var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
      headers.append('Accept', 'application/json');
      this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists/" + this.playlist_id + "/tracks"; 
      let songs: Song[] = this.songsService.getSongs(); //playlist_id is hardcoded rn. needs to be added dynamically
      let songIDs : String [] = [];
      for (var i = 0; i < songs.length; i++){
        songIDs.push("spotify:track:" + songs[i].spotifyID);
      }
      let body = {"uris": songIDs};
      this.http
          .post(this.user_url, JSON.stringify(body), {headers : headers})
          .toPromise()
          .then(response => console.log(response))
          .catch(this.handleError);
    }

  create_playlist (playlistName: String){
    var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
    headers.append('Content-Type', 'application/json');
    this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists";
    //let body = "name\" + playlistName;
    var body = {name : null, public : null};
    body.name = playlistName;
    body.public = true;
    return this.http
          .post(this.user_url, JSON.stringify(body), {headers : headers})
          .toPromise()
          .then(response => console.log(response))
          .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}