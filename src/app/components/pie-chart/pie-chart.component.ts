import { Component, Input, OnInit } from '@angular/core';
import { PlayerScore } from 'src/app/models/playerStats-model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() playerData!: PlayerScore | undefined;

  ngOnInit(): void {
    //console.log(this.playerData)
    if (this.playerData) this.drawPieChart(this.playerData);
  }

  drawPieChart(data: PlayerScore) {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const stats = {
        "Field Goals": data.field_goals,
        "Three-Point Goals": data.three_fg,
        "Free Throws": data.ft
      };

      const keys = Object.keys(stats);
      const values = Object.values(stats) as number[];
      const colors = ['#FF7200', '#0071EB', '#FF0000'];

      const total = values.reduce((sum, value) => sum + value, 0);
      let startAngle = 0;

      values.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        ctx.fillStyle = colors[index];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2), startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        // Etiquetas
        const midAngle = startAngle + sliceAngle / 2;
        const labelX = canvas.width / 2 + (Math.min(canvas.width / 2, canvas.height / 2) * 0.7) * Math.cos(midAngle);
        const labelY = canvas.height / 2 + (Math.min(canvas.width / 2, canvas.height / 2) * 0.7) * Math.sin(midAngle);

        // Línea de guía
        const guideX = canvas.width / 2 + (Math.min(canvas.width / 2, canvas.height / 2) * 0.9) * Math.cos(midAngle);
        const guideY = canvas.height / 2 + (Math.min(canvas.width / 2, canvas.height / 2) * 0.9) * Math.sin(midAngle);
        ctx.beginPath();
        ctx.moveTo(guideX, guideY);
        ctx.lineTo(labelX, labelY);

        startAngle += sliceAngle;
      });
    }
  }
}
