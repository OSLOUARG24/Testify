import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIterationComponent } from './update-iteration.component';

describe('UpdateIterationComponent', () => {
  let component: UpdateIterationComponent;
  let fixture: ComponentFixture<UpdateIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIterationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
