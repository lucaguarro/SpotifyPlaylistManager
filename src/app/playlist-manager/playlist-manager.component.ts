import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { SongsService } from '../shared/songs.service';
import { Song } from '../shared/song.model';

@Component({
  selector: 'app-playlist-manager',
  templateUrl: './playlist-manager.component.html',
  styleUrls: ['./playlist-manager.component.css'],
  providers : [SpotifyService]
})
export class PlaylistManagerComponent implements OnInit {
  selectedSong: Song;
  constructor(
    private spotifyserv : SpotifyService,
    private songService: SongsService
  ) { }

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
        console.log("Successful Request :3", obj);
      }
    }

    this.songService.newSongSelected
      .subscribe(
        (song: Song) => {
          this.selectedSong = song;
          console.log(this.selectedSong);
        }
      );
  }

}
