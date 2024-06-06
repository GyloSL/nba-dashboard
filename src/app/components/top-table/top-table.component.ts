import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewportScroller } from '@angular/common';
import { NbaService } from '../../services/nba.service';
import { PlayerScore, PlayerStats } from 'src/app/models/playerStats-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-table',
  templateUrl: './top-table.component.html',
  styleUrls: ['./top-table.component.scss']
})
export class TopTableComponent implements OnInit {
  private _type!: 'scorers' | 'assist' | 'rebounders';
  private _season!: string;

  @Input() set season(value: string) {
    this.isLoading = false;
    this._season = value;
    this.onChanges()
  };

  @Input() set type(value: 'scorers' | 'assist' | 'rebounders') {
    this.isLoading = false;
    this._type = value;
    this.onChanges()
  };

  isLoading = false;
  displayedColumns: string[] = ['player_name', 'PTS', 'TRB', 'AST', 'minutes_played'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;
  currentPage: number = 0;
  pageSize: number = 100;
  count: number | null = 201
  title: string = ""

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private nbaService: NbaService, private viewportScroller: ViewportScroller, private _router: Router) { }

  ngOnInit(): void {
    //this.onChanges()
  }

  onChanges() {
    switch (this._type) {
      case ("scorers"): this.title = `Top anotaciones temporada ${this._season}`; break;
      case ("assist"): this.title = `Top asistencias temporada ${this._season}`; break;
      case ("rebounders"): this.title = `Top rebotes temporada ${this._season}`; break;
    }
    this.loadPlayerStats(this._season, this._type);
  }

  loadPlayerStats(season: string, type: 'scorers' | 'assist' | 'rebounders'): void {
    if (this.isLoading) return
    this.isLoading = true;
    this.nbaService.getPlayerStatsBySeason(season, type).subscribe(
      (res: PlayerStats) => {
        if (res.results) {
          this.updateTableData(res)
        } else {
          console.log("Error");
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  loadPlayerStatsByUrl(url: string): void {
    this.isLoading = true;
    this.nbaService.getPlayerStatsByURL(url).subscribe(
      (res: PlayerStats) => {
        if (res.results) {
          this.updateTableData(res);
        } else {
          console.log("Error");
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  updateTableData(data: PlayerStats): void {
    if (data && data.results) {
      this.scrollToTop(); // Desplazarse hacia arriba después de cargar datos
      this.dataSource.data = data.results; // Acumula los resultados
      this.nextPageUrl = data.next;
      this.prevPageUrl = data.previous;
      this.count = data.count;
    } else {
      console.error("No data found.");
    }
    this.isLoading = false;
  }

  handlePageEvent(event: PageEvent): void {
    if (event.pageIndex > this.currentPage) {
      // Next page
      if (this.nextPageUrl) {
        this.loadPlayerStatsByUrl(this.nextPageUrl);
      }
    } else {
      // Previous page
      if (this.prevPageUrl) {
        this.loadPlayerStatsByUrl(this.prevPageUrl);
      }
    }
    this.currentPage = event.pageIndex;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  onNavigatePlayerStatistics(player: PlayerScore) {
    this._router.navigate(['player-statistics'], {
      state: {
        playerData: player
      }
    });
  }
}
