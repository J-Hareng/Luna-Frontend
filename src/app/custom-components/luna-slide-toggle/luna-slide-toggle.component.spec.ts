import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaSlideToggleComponent } from './luna-slide-toggle.component';

describe('LunaSlideToggleComponent', () => {
  let component: LunaSlideToggleComponent;
  let fixture: ComponentFixture<LunaSlideToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaSlideToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
