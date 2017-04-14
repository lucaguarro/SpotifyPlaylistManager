import { Component, OnInit } from '@angular/core';
import { Song } from '../../shared/song.model';

@Component({
  selector: 'app-selected-song-default',
  templateUrl: './selected-song-default.component.html',
  styleUrls: ['./selected-song-default.component.css']
})
export class SelectedSongDefaultComponent implements OnInit {
  songTemplate: Song;
  constructor() { }

  ngOnInit() {
    this.songTemplate = new Song(
          'Playlist Manager',
          'Playlist Manager',
          '../../../assets/Images/Playlistant.png',
          ''
        )
  }

}
