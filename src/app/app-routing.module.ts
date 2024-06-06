import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerStatisticsComponent } from './components/player-statistics/player-statistics.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'player-statistics', component: PlayerStatisticsComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
