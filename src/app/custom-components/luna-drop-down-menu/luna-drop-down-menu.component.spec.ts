import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaDropDownMenuComponent } from './luna-drop-down-menu.component';

describe('LunaDropDownMenuComponent', () => {
  let component: LunaDropDownMenuComponent;
  let fixture: ComponentFixture<LunaDropDownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaDropDownMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaDropDownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
