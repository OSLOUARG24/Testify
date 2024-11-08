import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStageComponent } from './test-stage.component';

describe('TestStageComponent', () => {
  let component: TestStageComponent;
  let fixture: ComponentFixture<TestStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
