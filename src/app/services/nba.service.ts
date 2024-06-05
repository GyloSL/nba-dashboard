import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { PlayerStats } from '../models/playerStats-model';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  apiUrl = 'https://nba-stats-db.herokuapp.com/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getTopPlayers(season: string, type: 'scorers' | 'assist' | 'rebounders') {
    let url = '';
    if (type === 'scorers') {
      url = `${this.apiUrl}/playerdata/topscorers/total/season/${season}/`;
    } else if (type === 'assist') {
      url = `${this.apiUrl}/top_assists/totals/${season}/`;
    } else if (type === 'rebounders') {
      url = `${this.apiUrl}/top_rebounds/totals/${season}/`;
    }
    return url;
  }

  getPlayerStatsBySeason(season: string,  type: 'scorers' | 'assist' | 'rebounders') {
    let url = this.getTopPlayers(season, type);
    return this.http
      .get(`${url}`, this.httpOptions)
      .pipe(map((response) => response as PlayerStats));
  }

  getPlayerStatsByURL(url: string) {
    return this.http
      .get(`${url}`, this.httpOptions)
      .pipe(map((response) => response as PlayerStats));
  }
}
