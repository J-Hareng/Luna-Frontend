import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaTextareaComponent } from './luna-textarea.component';

describe('LunaTextareaComponent', () => {
  let component: LunaTextareaComponent;
  let fixture: ComponentFixture<LunaTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
