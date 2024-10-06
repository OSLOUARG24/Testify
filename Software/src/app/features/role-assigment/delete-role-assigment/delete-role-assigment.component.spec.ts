import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoleAssigmentComponent } from './delete-role-assigment.component';

describe('DeleteRoleAssigmentComponent', () => {
  let component: DeleteRoleAssigmentComponent;
  let fixture: ComponentFixture<DeleteRoleAssigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRoleAssigmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRoleAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
