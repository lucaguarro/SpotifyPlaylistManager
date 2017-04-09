import { Component, OnInit } from '@angular/core';
import { Song } from '../../shared/song.model';
import { Subscription } from 'rxjs/Subscription';
import { SongsService } from '../../shared/songs.service';

@Component({
  selector: 'app-songs-added',
  templateUrl: './songs-added.component.html',
  styleUrls: ['./songs-added.component.css']
})
export class SongsAddedComponent implements OnInit {

  songs: Song[];
  playlistName: string = "PlaylistName";

  subscription: Subscription;

  constructor(private songsService: SongsService) { }

  //Get 

  ngOnInit() {
    this.subscription = this.songsService.songsChanged
      .subscribe(
        (songs: Song[]) => {
          this.songs = songs;
        }
      );
    this.songs = this.songsService.getSongs();
    console.log(this.songs);
  }

}
