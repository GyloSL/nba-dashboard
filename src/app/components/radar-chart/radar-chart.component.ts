import { Component, Input, OnInit } from '@angular/core';
import { PlayerScore } from 'src/app/models/playerStats-model';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {
  @Input() playerData!: PlayerScore | undefined;

  ngOnInit(): void {
    if (this.playerData) this.drawRadarChart(this.playerData);
  }

  drawRadarChart(data: PlayerScore) {
    const canvas = document.getElementById('radarChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const stats = {
        Points: data.PTS,
        Assists: data.AST,
        Rebounds: data.TRB,
        Steals: data.STL,
        Blocks: data.BLK,
        Turnovers: data.TOV,
      };

      const keys = Object.keys(stats);
      const values = Object.values(stats) as number[];
      const maxStat = Math.max(...values);
      const numAxes = keys.length;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 50;

      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = (i / numAxes) * (2 * Math.PI);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#ddd';
      ctx.stroke();

      values.forEach((value, index) => {
        const angle = (index / numAxes) * (2 * Math.PI);
        const x = centerX + (radius * value / maxStat) * Math.cos(angle);
        const y = centerY + (radius * value / maxStat) * Math.sin(angle);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 128, 255, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#0080ff';
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.font =
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      keys.forEach((key, index) => {
        const angle = (index / numAxes) * (2 * Math.PI);
        const x = centerX + (radius + 28) * Math.cos(angle);
        const y = centerY + (radius + 20) * Math.sin(angle);
        ctx.fillText(key, x, y+4);
      });
    }
  }
}
