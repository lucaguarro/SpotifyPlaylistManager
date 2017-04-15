import { SongSearchParams } from './../../shared/song-search-params.model';
import { SongsService } from './../../shared/songs.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {SpotifyService} from '../../spotify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent {

  constructor(
    private spotifyserv : SpotifyService,
    private songsService: SongsService
  ){}
  @ViewChild('f') playlistForm: NgForm;
  @ViewChild('fileContentInput') fileSelectedInput: ElementRef;

  playlistName: string = "";
  fileSelected: string = "No file selected";
  fileEvent: Event;

  onSubmit(form: NgForm){
    console.log(this.playlistForm.value.playlistName);
    this.spotifyserv.create_playlist(this.playlistForm.value.playlistName)
      .then(()=> {
        this.spotifyserv.get_playlist(this.playlistForm.value.playlistName)
        .then(()=>{
            const searchPromises: Promise<void>[] = [];
            while (this.songsService.songSearches.length){
              searchPromises.push(this.spotifyserv.searchTrack(this.songsService.songSearches[0]));
              this.songsService.songSearches.shift();
            }
            //Needs to wait until all requests ^ have been completed
            Promise.all(searchPromises)
              .then(() => {
                    for(var i = 0; i < searchPromises.length; i += 100){
                      this.spotifyserv.add_tracks_to_playlist(i)
                    }
                  }
              );
        })
      })
    ;
/*    const searchPromises: Promise<void>[] = [];
    while (this.songsService.songSearches.length){
      searchPromises.push(this.spotifyserv.searchTrack(this.songsService.songSearches[0]));
      this.songsService.songSearches.shift();
    }
    //Needs to wait until all requests ^ have been completed
    Promise.all(searchPromises)
      .then(() => this.spotifyserv.add_tracks_to_playlist());*/
  }

  saveFile(event){
    this.fileEvent = event;
  }

  print_file_contents (event) {
    var file   = event.target.files[0];
    var reader = new FileReader();
    
    var read_file = (event) => {
      //console.log(event);
      var lines = event.target.result.split(/[\r\n]+/g);
      for (var i = 0; i < lines.length; i++) {
        var name   = lines[i].match(/.+,/g)[0];
        var artist = lines[i].match(/,.+/g)[0];
          if (name && artist) {
            name   = name.slice(0, name.length-1).trim();
            artist = artist.slice(1, artist.length).trim();
            this.songsService.songSearches.push(new SongSearchParams(name,artist));
            //this.spotifyserv.searchTrack({title: name, artist: artist});
            //console.log(this.songsService.songSearches);
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
