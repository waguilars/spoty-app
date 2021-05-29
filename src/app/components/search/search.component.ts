import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  artists: any[];
  loading: boolean;

  constructor(private spotify: SpotifyService) {  }

  ngOnInit(): void {}

  search(searchTerm: string) {
    this.loading = true;
    this.spotify.getArtists(searchTerm).subscribe((data) => {
      this.artists = data;
      this.loading = false;
    });
  }
}
