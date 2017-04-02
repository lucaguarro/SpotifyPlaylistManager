import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [SpotifyService]
})
export class LoginComponent implements OnInit {

  constructor(private spotifyserv : SpotifyService) { }

  ngOnInit() {
  }
}
