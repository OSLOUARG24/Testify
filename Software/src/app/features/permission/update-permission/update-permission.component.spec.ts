import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePermissionComponent } from './update-permission.component';

describe('UpdatePermissionComponent', () => {
  let component: UpdatePermissionComponent;
  let fixture: ComponentFixture<UpdatePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
