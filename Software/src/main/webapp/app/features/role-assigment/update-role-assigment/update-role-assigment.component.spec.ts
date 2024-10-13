import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoleAssigmentComponent } from './update-role-assigment.component';

describe('UpdateRoleAssigmentComponent', () => {
  let component: UpdateRoleAssigmentComponent;
  let fixture: ComponentFixture<UpdateRoleAssigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRoleAssigmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRoleAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
