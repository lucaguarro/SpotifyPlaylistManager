import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-songs-added',
  templateUrl: './songs-added.component.html',
  styleUrls: ['./songs-added.component.css']
})
export class SongsAddedComponent implements OnInit {

  playlistName: string = "PlaylistName";

  constructor() { }

  ngOnInit() {
  }

}
