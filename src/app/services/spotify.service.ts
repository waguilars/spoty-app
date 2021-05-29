import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string, params?: HttpParams) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        `Bearer ${environment.token}`,
    });

    return !params
      ? this.http.get(url, { headers })
      : this.http.get(url, { headers, params });
  }

  getNewReleases(): Observable<any> {
    return this.getQuery('browse/new-releases').pipe(
      map((data: any) => data.albums.items)
    );
  }

  getArtists(searchTerm: string): Observable<any> {
    const params = new HttpParams()
      .set('q', searchTerm || ' ')
      .set('type', 'artist')
      .set('limit', '15');

    return this.getQuery('search', params).pipe(
      map((data: any) => data.artists.items)
    );
  }

  getArtist(id: string): Observable<any> {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string): Observable<any[]> {
    const params = new HttpParams().set('country', 'es');
    return this.getQuery(`artists/${id}/top-tracks`, params)
      .pipe(map((data: any) => data.tracks));
  }
}
