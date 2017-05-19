import { Playlist } from './../../../shared/playlist.model';
import { SpotifyService } from './../../../spotify.service';
import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-playlists-dialog',
  templateUrl: './playlists-dialog.component.html',
  styleUrls: ['./playlists-dialog.component.css']
})
export class PlaylistsDialogComponent implements OnInit {
  playlistOffset: number = 0;
  playlists: Playlist [] = [];
  constructor(public dialogRef: MdDialogRef<PlaylistsDialogComponent>, private spotifyserv: SpotifyService) {}

  ngOnInit() {
    this.spotifyserv.get_playlists(this.playlistOffset).then(
      (response)=>{
        var res = response.json().items;
        console.log(res);
        for(var i = 0; i < res.length; i++){
          if(res[i].name.length > 50){
            res[i].name = res[i].name.substring(0,50);
          }
          let playlist: Playlist = new Playlist(res[i].name, res[i].id);
          this.playlists.push(playlist);
        }
      }
    );  
  }
}
