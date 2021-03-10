import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRefugeComponent } from './add-refuge.component';

describe('AddRefugeComponent', () => {
  let component: AddRefugeComponent;
  let fixture: ComponentFixture<AddRefugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRefugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRefugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
