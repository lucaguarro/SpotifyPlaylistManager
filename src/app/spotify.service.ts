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
  //local_playlists : Array<{}>; // make a playlist object :>
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
              if(res.tracks.items[0]){
                var searched_song = {artist : null, title : null, imagePath : null, spotifyID : null}
                searched_song.artist = res.tracks.items[0].artists[0].name;
                searched_song.title = res.tracks.items[0].name;
                if(res.tracks.items[0].album.images[0]){
                  searched_song.imagePath = res.tracks.items[0].album.images[0].url;
                } else{
                  searched_song.imagePath = "../../assets/Images/No_image.png";
                }
                searched_song.spotifyID = res.tracks.items[0].id;
                this.songsService.addSong(searched_song);
              } else{
                var song_not_found = {artist : null, title : null, imagePath : null, spotifyID : null}
                song_not_found.artist = searchParams.artist;
                song_not_found.title = searchParams.title;
                song_not_found.imagePath = "../../assets/Images/notFound.png";
                song_not_found.spotifyID = "Song not found";
                this.songsService.addSong(song_not_found);
              }
        }
      );
  }
  /*get_playlists () {
    var songFound = false;
    var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
    this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists" + "/?limit=50&offset=" + this.playlistOffset;
    return this.http
                  .get(this.user_url, {headers : headers})
                  .toPromise()
                  .then(
                      (response) => {
                          response.json().items;                    
                      })
                  .catch(this.handleError);
  }*/

  get_playlists (playlistOffset: number) {
    var songFound = false;
    var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
    this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists" + "/?limit=50&offset=" + playlistOffset;
    return this.http
                  .get(this.user_url, {headers : headers})
                  .toPromise()
                  .catch(this.handleError);
  }

    add_tracks_to_playlist(songOffset: number, playlist_id: string){
      var headers = new Headers({'Authorization': 'Bearer ' + this.hash_params.access_token});
      headers.append('Accept', 'application/json');
      this.user_url = "https://api.spotify.com/v1/users/" + this.user_id + "/playlists/" + playlist_id + "/tracks"; 
      let songs: Song[] = this.songsService.getSongs(); //playlist_id is hardcoded rn. needs to be added dynamically
      let songIDs : String [] = [];
      var numSongsToAdd;
      if((songs.length - songOffset) > 100){
        numSongsToAdd = 100;
      } else{
        numSongsToAdd = songs.length;
      }
      
      for (var i = songOffset; i < numSongsToAdd + songOffset; i++){
        if(songs[i].spotifyID != "Song not found"){
          songIDs.push("spotify:track:" + songs[i].spotifyID);
        }
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