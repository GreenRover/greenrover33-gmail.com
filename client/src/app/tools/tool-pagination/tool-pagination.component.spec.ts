import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPaginationComponent } from './tool-pagination.component';

describe('ToolPaginationComponent', () => {
  let component: ToolPaginationComponent;
  let fixture: ComponentFixture<ToolPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
