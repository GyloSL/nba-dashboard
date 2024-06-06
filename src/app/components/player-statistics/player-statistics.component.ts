import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerScore } from 'src/app/models/playerStats-model';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss']
})
export class PlayerStatisticsComponent implements OnInit {
  playerData!: PlayerScore | undefined;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.playerData = navigation.extras.state['playerData'];
      console.log(this.playerData)
    }
  }

  ngOnInit(): void {

  }
}
