import { SongSearchParams } from './song-search-params.model';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Song } from './song.model';
import { Playlist } from './playlist.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SongsService {
  @Output() playlistCreated = new EventEmitter<String>();
  //@Output() playlistChosen = new EventEmitter<Playlist>();
  songsChanged = new Subject<Song[]>();
  newSongSelected = new EventEmitter<Song>();
  public songSearches: SongSearchParams[] = []
  private songs: Song[] = []
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
