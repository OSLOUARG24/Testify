import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubTypeComponent } from './update-sub-type.component';

describe('UpdateSubTypeComponent', () => {
  let component: UpdateSubTypeComponent;
  let fixture: ComponentFixture<UpdateSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSubTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
