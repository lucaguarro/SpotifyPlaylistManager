import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
