import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZugPosComponent } from './zug-pos.component';

describe('ZugPosComponent', () => {
  let component: ZugPosComponent;
  let fixture: ComponentFixture<ZugPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZugPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZugPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
