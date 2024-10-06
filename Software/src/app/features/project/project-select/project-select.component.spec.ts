import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelectComponent } from './project-select.component';

describe('ProjectSelectComponent', () => {
  let component: ProjectSelectComponent;
  let fixture: ComponentFixture<ProjectSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
