import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportProjectComponent } from './export-project.component';

describe('ExportProjectComponent', () => {
  let component: ExportProjectComponent;
  let fixture: ComponentFixture<ExportProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
