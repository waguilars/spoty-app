import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'spoty-app';

  constructor(private spotify: SpotifyService) {

  }

  ngOnInit(): void {
    this.spotify.getAuth().subscribe()
  }
}
