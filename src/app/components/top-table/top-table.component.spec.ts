import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTableComponent } from './top-table.component';

describe('TopTableComponent', () => {
  let component: TopTableComponent;
  let fixture: ComponentFixture<TopTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopTableComponent]
    });
    fixture = TestBed.createComponent(TopTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
