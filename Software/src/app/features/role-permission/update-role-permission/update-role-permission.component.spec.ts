import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRolePermissionComponent } from './update-role-permission.component';

describe('UpdateRolePermissionComponent', () => {
  let component: UpdateRolePermissionComponent;
  let fixture: ComponentFixture<UpdateRolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRolePermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
