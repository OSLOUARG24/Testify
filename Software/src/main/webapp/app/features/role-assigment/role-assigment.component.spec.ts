import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAssigmentComponent } from './role-assigment.component';

describe('RoleAssigmentComponent', () => {
  let component: RoleAssigmentComponent;
  let fixture: ComponentFixture<RoleAssigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleAssigmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
