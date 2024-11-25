import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaMultiDropDownMenuComponent } from './luna-multi-drop-down-menu.component';

describe('LunaMultiDropDownMenuComponent', () => {
  let component: LunaMultiDropDownMenuComponent;
  let fixture: ComponentFixture<LunaMultiDropDownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaMultiDropDownMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaMultiDropDownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
