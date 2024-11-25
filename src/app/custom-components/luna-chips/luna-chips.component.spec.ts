import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaChipsComponent } from './luna-chips.component';

describe('LunaChipsComponent', () => {
  let component: LunaChipsComponent;
  let fixture: ComponentFixture<LunaChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaChipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
