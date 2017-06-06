import { PlayPauseDirective } from './playlist-manager/songs-added/song-item/play-pause.directive';
import { RedTrashDirective } from './playlist-manager/songs-added/song-item/red-trash.directive';
import { SpotifyService } from './spotify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlaylistManagerComponent } from './playlist-manager/playlist-manager.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { HeaderComponent } from './playlist-manager/header/header.component';
import { PlaylistFormComponent } from './playlist-manager/playlist-form/playlist-form.component';
import { SelectedSongViewComponent } from './playlist-manager/selected-song-view/selected-song-view.component';
import { SongsAddedComponent } from './playlist-manager/songs-added/songs-added.component';
import { SongItemComponent } from './playlist-manager/songs-added/song-item/song-item.component';
import { SongsService } from './shared/songs.service';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { SelectedSongDefaultComponent } from './playlist-manager/selected-song-default/selected-song-default.component';
import { PlaylistsDialogComponent } from './playlist-manager/playlist-form/playlists-dialog/playlists-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaylistManagerComponent,
    HeaderComponent,
    PlaylistFormComponent,
    SelectedSongViewComponent,
    SongsAddedComponent,
    SongItemComponent,
    AboutComponent,
    SelectedSongDefaultComponent,
    PlaylistsDialogComponent,
    RedTrashDirective
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  entryComponents: [PlaylistsDialogComponent],
  providers: [AuthService, AuthGuard, SpotifyService, SongsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
