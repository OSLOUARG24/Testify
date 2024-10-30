import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageDetailComponent } from './stage-detail.component';

describe('StageDetailComponent', () => {
  let component: StageDetailComponent;
  let fixture: ComponentFixture<StageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
