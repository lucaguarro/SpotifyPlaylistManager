import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-playlists-dialog',
  templateUrl: './playlists-dialog.component.html',
  styleUrls: ['./playlists-dialog.component.css']
})
export class PlaylistsDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<PlaylistsDialogComponent>) {}

  ngOnInit() {
  }

}
