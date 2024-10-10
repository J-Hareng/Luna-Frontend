import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageGroupSelectComponent } from './main-page-group-select.component';

describe('MainPageGroupSelectComponent', () => {
  let component: MainPageGroupSelectComponent;
  let fixture: ComponentFixture<MainPageGroupSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageGroupSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
