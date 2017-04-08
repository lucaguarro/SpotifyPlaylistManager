import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../shared/song.model';
import { SongsService } from '../../shared/songs.service';

@Component({
  selector: 'app-selected-song-view',
  templateUrl: './selected-song-view.component.html',
  styleUrls: ['./selected-song-view.component.css']
})
export class SelectedSongViewComponent implements OnInit {

  @Input() song: Song;

  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.song = new Song(
          'Playlist Manager',
          'Playlist Manager',
          '../../../assets/Images/logo.png'
        )
  }


}
