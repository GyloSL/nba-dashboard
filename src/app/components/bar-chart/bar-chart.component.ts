import { Component, OnInit, Input } from '@angular/core';
import { PlayerScore } from 'src/app/models/playerStats-model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() playerData!: PlayerScore | undefined;

  ngOnInit(): void {
    //console.log(this.playerData)
    if (this.playerData) this.drawBarChart(this.playerData);
  }

  drawBarChart(data: PlayerScore) {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const colors = ['#FF0000', '#FF7200', '#FDFF00', '#37FF00','#0071EB']
      const stats = {
        Points: data.PTS,
        Assists: data.AST,
        Rebounds: data.TRB,
        Steals: data.STL,
        Blocks: data.BLK,
      };

      const keys = Object.keys(stats);
      const values = Object.values(stats) as number[];

      const barWidth = 50;
      const barSpacing = 20;
      const chartHeight = canvas.height - 40;
      const maxStat = Math.max(...values);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      keys.forEach((key, index) => {
        const barHeight = (values[index] / maxStat) * chartHeight;
        ctx.fillStyle = colors[index];
        ctx.fillRect(
          index * (barWidth + barSpacing),
          canvas.height - barHeight - 20,
          barWidth,
          barHeight
        );

        ctx.fillStyle = 'white';
        ctx.fillText(
          key,
          index * (barWidth + barSpacing) + barWidth / 2 - ctx.measureText(key).width / 2,
          canvas.height - 8
        );

        ctx.fillText(
          values[index].toString(),
          index * (barWidth + barSpacing) + barWidth / 2 - ctx.measureText(values[index].toString()).width / 2,
          canvas.height - barHeight - 30
        );
      });
    }
  }
}
