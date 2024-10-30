import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStageComponent } from './update-stage.component';

describe('UpdateStageComponent', () => {
  let component: UpdateStageComponent;
  let fixture: ComponentFixture<UpdateStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
