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

  listOfSongs: Song[];
  playlistName: string = "PlaylistName";

  subscription: Subscription;

  constructor(private songsService: SongsService) { }

  //Get 

  ngOnInit() {
    this.subscription = this.songsService.songsChanged
      .subscribe(
        (songs: Song[]) => {
          this.listOfSongs = songs;
        }
      );
    this.listOfSongs = this.songsService.getSongs();
  }

}
