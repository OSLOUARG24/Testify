import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIterationComponent } from './delete-iteration.component';

describe('DeleteIterationComponent', () => {
  let component: DeleteIterationComponent;
  let fixture: ComponentFixture<DeleteIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteIterationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
