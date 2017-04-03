import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../shared/song.model';
import { SongsService } from '../../shared/songs.service';

@Component({
  selector: 'app-selected-song-view',
  templateUrl: './selected-song-view.component.html',
  styleUrls: ['./selected-song-view.component.css']
})
export class SelectedSongViewComponent implements OnInit {

  @Input() selectedSong: Song;
  imageUrl: string = '../../assets/Images/logo.png';

  constructor(private songsService: SongsService) {
    this.songsService.newSongSelected.subscribe(
      (song: Song) => {
        this.selectedSong = song;
        console.log(this.selectedSong);
       this.imageUrl = this.selectedSong["coverArtUrl"];
      }
    );
  }

  ngOnInit() {
  }

  onSetSongTo(){
    this.songsService.newSongSelected.emit();
  }

}
