import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTypeComponent } from './sub-type.component';

describe('SubTypeComponent', () => {
  let component: SubTypeComponent;
  let fixture: ComponentFixture<SubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
