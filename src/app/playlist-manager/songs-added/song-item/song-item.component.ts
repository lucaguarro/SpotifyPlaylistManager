import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../../shared/song.model';
import { SongsService } from '../../../shared/songs.service';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {
  @Input() song: Song;
  @Input() index: number;

  constructor(private songsService: SongsService){}

  ngOnInit() {
  }

  onSelected(){
    this.songsService.newSongSelected.emit(this.song);
  }

}
