import { Playlist } from './../../shared/playlist.model';
import { PlaylistsDialogComponent } from './playlists-dialog/playlists-dialog.component';
import { SongSearchParams } from './../../shared/song-search-params.model';
import { SongsService } from './../../shared/songs.service';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import {SpotifyService} from '../../spotify.service';
import { NgForm } from '@angular/forms';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent {

  constructor(
    private spotifyserv : SpotifyService,
    private songsService: SongsService,
    public dialog: MdDialog
  ){}
  @ViewChild('f') playlistForm: NgForm;
  @ViewChild('fileContentInput') fileSelectedInput: ElementRef;

  createNew: boolean = true;
  playlistOffset: number = 0;
  selectedPlaylist: Playlist = new Playlist('','');
  playlistRadios: string[] = ["Create new", "Append to existing"];
  fileSelected: string = "No file selected";
  fileEvent: Event;

  openDialog() {
    let dialogRef = this.dialog.open(PlaylistsDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.selectedPlaylist = result;
        this.playlistForm.value.playlistName = this.selectedPlaylist.title;
      }
    });
  }
  radioChanged(option: string){
    console.log("uo", option);
    if(option == "Append to existing"){
      this.createNew = false;
      this.openDialog();
    } else{
      this.createNew = true;
      this.selectedPlaylist = new Playlist('','');
    }
  }

  getPlaylist(playlistName: string, playlists: any){
    var songFound = false;
    //let playlist_id : string; //0NvZ1eA6qo1jBk1BigahyX
    for(var i = 0; i < playlists.length; i++){
      if(playlists[i].name == playlistName){
        songFound = true;
        console.log("yoooo", playlists[i].id);
        this.playlistOffset = 0;
        return playlists[i].id;
      }
    }
    if(!songFound){
      this.playlistOffset += 50;
      //this.getPlaylist(playlistName, playlists, playlistOffset);
      this.spotifyserv.get_playlists(this.playlistOffset).then((response)=>{
        var res = response.json().items;
        this.getPlaylist(this.playlistForm.value.playlistName, res);
      });
    }
  }

  onSubmit(form: NgForm){

    if(this.createNew){
      this.songsService.playlistCreated.emit(this.playlistForm.value.playlistName);
      console.log(this.playlistForm.value.playlistName);
      this.spotifyserv.create_playlist(this.playlistForm.value.playlistName)
        .then(()=> {
          this.spotifyserv.get_playlists(this.playlistOffset)//this.playlistForm.value.playlistName
          .then((response)=>{
              var res = response.json().items;
              let playlist_id : string = this.getPlaylist(this.playlistForm.value.playlistName, res);
              const searchPromises: Promise<void>[] = [];
              while (this.songsService.songSearches.length){
                searchPromises.push(this.spotifyserv.searchTrack(this.songsService.songSearches[0]));
                this.songsService.songSearches.shift();
              }
              //Needs to wait until all requests ^ have been completed
              Promise.all(searchPromises)
                .then(() => {
                      for(var i = 0; i < searchPromises.length; i += 100){//spotify only allows up to 100songs at once
                        this.spotifyserv.add_tracks_to_playlist(i, playlist_id)
                      }
                    }
                );
          })
        })
      ;
    } else if(!this.createNew && this.selectedPlaylist){

    }
  }

  onClear(){
    //this.playlistForm.value.playlistName.set = '';
    this.playlistForm.reset();
    this.songsService.songSearches = [];
    this.fileSelected = "No file selected";
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
