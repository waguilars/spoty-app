import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
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
    this.spotify
      .getAuth()
      .pipe(mergeMap(() => this.spotify.getNewReleases()))
      .subscribe(
        (data) => {
          this.newSongs = data;
          this.loading = false;
        },
        (serviceError) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = serviceError.error?.msg|| serviceError.error?.error.message;
        }
      );
  }
}
