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
  providers: [SpotifyService, SongsService]
})
export class PlaylistManagerComponent implements OnInit {
  selectedSong: Song;
  searchedSong: Song = new Song('','','');

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
    onClick(){
      //this.spotifyserv.get_playlist(this.spotifyserv.hash_params.access_token);
      for(let searchQuery of this.songService.songSearches){ 
        //var res = this.spotifyserv.searchTrack(searchQuery)
        //console.log(this.spotifyserv.searchTrack(searchQuery));
        var song_queue = [];
        this.spotifyserv.searchTrack(searchQuery, song_queue,
              response => {
                let res = response.json();
                console.log(res.tracks.items[0].album.images[0].url);
                console.log(res.tracks.items[0].name);
                console.log(res.tracks.items[0].artists[0].name);
                let searched_song = {artist : null, title : null, imagePath : null}
                searched_song.artist = res.tracks.items[0].artists[0].name;
                searched_song.title = res.tracks.items[0].name;
                searched_song.imagePath = res.tracks.items[0].album.images[0].url;
                console.log(searched_song);
                song_queue.push(searched_song);
              }
        )
      }
      setTimeout(() => {
        console.log(song_queue); 
        while (song_queue.length > 0) {
          this.songService.addSong(song_queue.pop());
        }
    }, 1000);
    }
  
}
