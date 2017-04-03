import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {SpotifyService} from '../../spotify.service';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent implements OnInit {

  constructor(
    private spotifyserv : SpotifyService
  ){}

  @ViewChild('fileContentInput') fileSelectedInput: ElementRef;

  fileSelected: string = "No file selected";

  logToConsole(){
    console.log(this.fileSelectedInput.nativeElement.value);
    this.fileSelected = this.fileSelectedInput.nativeElement.value;
    this.fileSelected = this.getJustFileName(this.fileSelected);
  }

  getJustFileName(fileWithPath: string){
    var justThePath = '';
    for (var i = fileWithPath.length - 1, len = 0; i >= len; i--) {
      if(fileWithPath[i]==="\\"){
        return justThePath;
      } else{
        justThePath = fileWithPath[i] + justThePath;
      }
    }
    console.log(this.fileSelected);
    return justThePath;
  }

  ngOnInit() {
  }

}
