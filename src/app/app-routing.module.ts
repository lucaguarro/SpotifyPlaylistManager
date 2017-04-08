import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { PlaylistManagerComponent } from './playlist-manager/playlist-manager.component';
import { SelectedSongViewComponent } from './playlist-manager/selected-song-view/selected-song-view.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent},
    { path: 'playlist-manager', canActivate: [AuthGuard],component: PlaylistManagerComponent,children: [
        { path: ':id', component: SelectedSongViewComponent }
    ]  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}