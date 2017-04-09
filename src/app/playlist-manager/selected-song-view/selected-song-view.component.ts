import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Song } from '../../shared/song.model';
import { SongsService } from '../../shared/songs.service';

@Component({
  selector: 'app-selected-song-view',
  templateUrl: './selected-song-view.component.html',
  styleUrls: ['./selected-song-view.component.css']
})
export class SelectedSongViewComponent implements OnInit{

  song: Song;
  id: number;

  constructor(private songsService: SongsService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.song = this.songsService.getSong(this.id);
        }
      );
  }

}
