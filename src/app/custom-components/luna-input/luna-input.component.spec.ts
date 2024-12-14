import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaInputComponent } from './luna-input.component';

describe('LunaInputComponent', () => {
  let component: LunaInputComponent;
  let fixture: ComponentFixture<LunaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
