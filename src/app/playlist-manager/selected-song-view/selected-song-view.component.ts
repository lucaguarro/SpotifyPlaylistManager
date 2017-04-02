import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../shared/song.model';
import { SongsService } from '../../shared/songs.service';
import { GiveBackgroundImageDirective } from "./give-background-image.directive";

@Component({
  selector: 'app-selected-song-view',
  templateUrl: './selected-song-view.component.html',
  styleUrls: ['./selected-song-view.component.css'],
  providers: [GiveBackgroundImageDirective]
})
export class SelectedSongViewComponent implements OnInit {

  @Input() selectedSong: Song;

  constructor(private songsService: SongsService, private giveBackgroundImage: GiveBackgroundImageDirective) {
    this.songsService.newSongSelected.subscribe(
      (song: Song) => {
        this.selectedSong = song;
        console.log(this.selectedSong);
        this.giveBackgroundImage.imageUrl = this.selectedSong["coverArtUrl"];
        console.log("backgroundDirective: ",this.giveBackgroundImage.imageUrl);
      }
    );
  }

  ngOnInit() {
  }

  onSetSongTo(){
    this.songsService.newSongSelected.emit();
  }

}
