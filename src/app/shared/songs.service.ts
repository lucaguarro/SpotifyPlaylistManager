import { SongSearchParams } from './song-search-params.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Song } from './song.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SongsService {
  songsChanged = new Subject<Song[]>();
  newSongSelected = new EventEmitter<Song>();
  public songSearches: SongSearchParams[] = [
    /*new SongSearchParams(
      'Changes',
      '2pac'
    ),
    new SongSearchParams(
      'Purple',
      'Frightnrs'
    ),
    new SongSearchParams(
      'Could you be loved',
      'Bob Marley'
    ),*/
  ]
  private songs: Song[] = [
    /*new Song(
      'HUMBLE',
      'Kendrick Lamar',
      '../../assets/Images/beHUMBLE.jpg'
    ),
    new Song(
      'So far to go',
      'J Dilla',
      '../../assets/Images/soFarToGo.jpg'
    )*/
  ]
  constructor() { }

  setSongs(songs: Song[]){
    this.songs = songs;
    this.songsChanged.next(this.songs.slice());
  }

  getSongs(){
    return this.songs.slice();
  }

//get song to selected-song-view
  getSong(index: number){
    return this.songs[index];
  }

  addSong(song: Song){
      this.songs.push(song);
      this.songsChanged.next(this.songs.slice());
  }

  getSongSearches(){
    return this.songSearches.slice();
  }

}
