import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRolePermissionComponent } from './delete-role-permission.component';

describe('DeleteRolePermissionComponent', () => {
  let component: DeleteRolePermissionComponent;
  let fixture: ComponentFixture<DeleteRolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRolePermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
