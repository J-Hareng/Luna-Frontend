import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLunaUtilsComponent } from './test-luna-utils.component';

describe('TestLunaUtilsComponent', () => {
  let component: TestLunaUtilsComponent;
  let fixture: ComponentFixture<TestLunaUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLunaUtilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLunaUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
