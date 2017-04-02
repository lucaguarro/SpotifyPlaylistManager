import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlaylistManagerComponent } from './playlist-manager/playlist-manager.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { HeaderComponent } from './playlist-manager/header/header.component';
import { PlaylistFormComponent } from './playlist-manager/playlist-form/playlist-form.component';
import { SelectedSongViewComponent } from './playlist-manager/selected-song-view/selected-song-view.component';
import { SongsAddedComponent } from './playlist-manager/songs-added/songs-added.component';
import { SpotifytestComponent } from './spotifytest/spotifytest.component';
import { SongItemComponent } from './playlist-manager/songs-added/song-item/song-item.component';
import { SongsService } from './shared/songs.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'playlist-manager', canActivate: [AuthGuard],component: PlaylistManagerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaylistManagerComponent,
    HeaderComponent,
    PlaylistFormComponent,
    SelectedSongViewComponent,
    SongsAddedComponent,
    SpotifytestComponent,
    SongItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard, SongsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
