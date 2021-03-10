import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRefugeComponent } from './delete-refuge.component';

describe('DeleteRefugeComponent', () => {
  let component: DeleteRefugeComponent;
  let fixture: ComponentFixture<DeleteRefugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRefugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRefugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
