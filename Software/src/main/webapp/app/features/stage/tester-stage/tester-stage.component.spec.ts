import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterStageComponent } from './tester-stage.component';

describe('TesterStageComponent', () => {
  let component: TesterStageComponent;
  let fixture: ComponentFixture<TesterStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesterStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesterStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
