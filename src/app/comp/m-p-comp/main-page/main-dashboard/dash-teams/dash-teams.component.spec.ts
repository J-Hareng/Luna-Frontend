import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTeamsComponent } from './dash-teams.component';

describe('DashTeamsComponent', () => {
  let component: DashTeamsComponent;
  let fixture: ComponentFixture<DashTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
