import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent implements OnInit {
  artist: any;
  topTracks: any[];
  loading: boolean;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    this.loading = true;
    this.route.params.subscribe((params) => {
      const artistId = params.id;
      this.getArtist(artistId);
      this.getTopTracks(artistId);
    });
  }

  ngOnInit(): void {}

  getArtist(id: string) {
    this.spotify.getArtist(id).subscribe((artist) => {
      this.artist = artist;
      this.loading = false;
    });
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe((tracks) => {
      this.topTracks = tracks;
      // console.log(this.topTracks)
    });
  }
}
