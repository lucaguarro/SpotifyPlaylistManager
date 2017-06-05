import { SongsService } from './../../../shared/songs.service';
import { SpotifyService } from './../../../spotify.service';
import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../../shared/song.model';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {
  @Input() song: Song;
  @Input() index: number;

  constructor(
    private spotifyserv : SpotifyService,
    private songserv : SongsService
  ){}

  ngOnInit() {
  }

  deleteSong(event){
    event.stopPropagation();
    console.log("ayyy 2pac", this.song.title);
    this.songserv.removeSong(this.index);
    this.spotifyserv.deleteSong(this.song.spotifyID);
  }

}
