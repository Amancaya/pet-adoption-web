import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRefugesComponent } from './list-refuges.component';

describe('ListRefugesComponent', () => {
  let component: ListRefugesComponent;
  let fixture: ComponentFixture<ListRefugesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRefugesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRefugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
