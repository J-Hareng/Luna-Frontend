import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTeamsComponent } from './main-teams.component';

describe('MainTeamsComponent', () => {
  let component: MainTeamsComponent;
  let fixture: ComponentFixture<MainTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
