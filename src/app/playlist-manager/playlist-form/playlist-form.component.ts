import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {SpotifyService} from '../../spotify.service';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent {

  constructor(
    private spotifyserv : SpotifyService
  ){}

  @ViewChild('fileContentInput') fileSelectedInput: ElementRef;

  playlistName: string = "";
  fileSelected: string = "No file selected";

  print_file_contents (event) {
    var file   = event.target.files[0];
    var reader = new FileReader();

    var read_file = (event) => {
      console.log(event);
      var playlist = [];
      var lines = event.target.result.split(/[\r\n]+/g);
      for (var i = 0; i < lines.length; i++) {
        var name   = lines[i].match(/.+,/g)[0];
        var artist = lines[i].match(/,.+/g)[0];
          if (name && artist) {
            name   = name.slice(0, name.length-1).trim();
            artist = artist.slice(1, artist.length).trim();
            playlist.push({ name : name, artist: artist});
            this.spotifyserv.searchTrack({title: name, artist: artist});
          }
      }
      // console.log(JSON.stringify(playlist, null, 2));
    }
		
		reader.onloadend = read_file;
		reader.readAsText(file);
  }
  updateFileName(){
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
}
