import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubTypeComponent } from './delete-sub-type.component';

describe('DeleteSubTypeComponent', () => {
  let component: DeleteSubTypeComponent;
  let fixture: ComponentFixture<DeleteSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSubTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
