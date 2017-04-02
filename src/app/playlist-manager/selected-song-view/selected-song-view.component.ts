import { Component, OnInit } from '@angular/core';
import { Song } from '../../shared/song.model';

@Component({
  selector: 'app-selected-song-view',
  templateUrl: './selected-song-view.component.html',
  styleUrls: ['./selected-song-view.component.css']
})
export class SelectedSongViewComponent implements OnInit {

  selectedSong: Song;

  constructor() { }

  ngOnInit() {
  }

}
