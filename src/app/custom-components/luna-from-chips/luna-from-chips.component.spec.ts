import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaFromChipsComponent } from './luna-from-chips.component';

describe('LunaFromChipsComponent', () => {
  let component: LunaFromChipsComponent;
  let fixture: ComponentFixture<LunaFromChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaFromChipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaFromChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
