import { SpotifyAuth } from './../interfaces/spotify.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  token: string;
  validToken: boolean = false;

  constructor(private http: HttpClient) {}

  getAuth() {
    const url = `https://accounts.spotify.com/api/token`;
    const { credentials } = environment;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')

    const payload = new HttpParams()
      .append('grant_type', credentials.grant_type)
      .append('client_id', credentials.client_id)
      .append('client_secret', credentials.client_secret);

    return this.http
      .post(url, payload, { headers })
      .pipe(tap((resp: SpotifyAuth) => {
        this.token = resp.access_token
        this.validToken = true
      }));
  }

  private getQuery(query: string, params?: HttpParams) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return !params
      ? this.http.get(url, { headers })
      : this.http.get(url, { headers, params })
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
