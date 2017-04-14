import { SongSearchParams } from './../shared/song-search-params.model';
import { Hash_Parameters } from './../shared/Hash_Parameters.model';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { SongsService } from '../shared/songs.service';
import { Song } from '../shared/song.model';

@Component({
  selector: 'app-playlist-manager',
  templateUrl: './playlist-manager.component.html',
  styleUrls: ['./playlist-manager.component.css'],
  //providers: [SongsService]
})
export class PlaylistManagerComponent implements OnInit {
  selectedSong: Song;

  constructor(
    private spotifyserv : SpotifyService,
    private songService: SongsService
  ) { }

  ngOnInit() {
    //This function subscribes to when a new song gets selected from the song list

    this.songService.newSongSelected
      .subscribe(
        (song: Song) => {
          this.selectedSong = song;
          console.log(this.selectedSong);
        }
      );

    //this.hashParams = this.spotifyserv.getHashParams();
    this.spotifyserv.hash_params = this.spotifyserv.getHashParams();
    //var params = this.spotifyserv.getHashParams();
    var access_token = this.spotifyserv.hash_params.access_token,
        state = this.spotifyserv.hash_params.state,
        storedState = localStorage.getItem(this.spotifyserv.state_key);
     
    if (access_token && (state == null || state !== storedState)) {
          console.log('There was an error during the authentication');
    } else {
      localStorage.removeItem(this.spotifyserv.state_key);
      if (access_token) {
        this.spotifyserv.get_uid(access_token);
        // obj.then(response => this.spotifyserv.get_playlist(response, access_token));
      }
    }
  }
    /*onClick(){
      this.spotifyserv.add_tracks_to_playlist();
    }
    get_playlist (){
      this.spotifyserv.get_playlist();
    }*/
  
}
