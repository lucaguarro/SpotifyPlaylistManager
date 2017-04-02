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
    SpotifytestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
