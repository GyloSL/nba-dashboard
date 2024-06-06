import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatisticsComponent } from './player-statistics.component';

describe('PlayerStatisticsComponent', () => {
  let component: PlayerStatisticsComponent;
  let fixture: ComponentFixture<PlayerStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerStatisticsComponent]
    });
    fixture = TestBed.createComponent(PlayerStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
