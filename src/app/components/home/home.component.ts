import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  newSongs: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spotify.getNewReleases().subscribe(
        (data) => {
          this.newSongs = data;
          this.loading = false;
        },
        (serviceError) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = serviceError.error.error.message;
        }
      );
    }, 1000);
  }
}
