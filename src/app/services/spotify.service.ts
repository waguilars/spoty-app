import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  token: string;

  constructor(private http: HttpClient) {}

  getAuth() {
    const url = environment.url;
    return this.http.get(url).pipe(
      tap((res: any) => {
        this.token = res.data.access_token;
      })
    );
  }

  private getQuery(query: string, params?: HttpParams) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
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
    return this.getQuery(`artists/${id}/top-tracks`, params).pipe(
      map((data: any) => data.tracks)
    );
  }
}
