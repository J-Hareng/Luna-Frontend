import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitOnbackklickComponent } from './exit-onbackklick.component';

describe('ExitOnbackklickComponent', () => {
  let component: ExitOnbackklickComponent;
  let fixture: ComponentFixture<ExitOnbackklickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitOnbackklickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitOnbackklickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
