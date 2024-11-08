import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStageComponent } from './delete-stage.component';

describe('DeleteStageComponent', () => {
  let component: DeleteStageComponent;
  let fixture: ComponentFixture<DeleteStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
