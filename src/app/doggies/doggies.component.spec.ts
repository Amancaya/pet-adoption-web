import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoggiesComponent } from './doggies.component';

describe('DoggiesComponent', () => {
  let component: DoggiesComponent;
  let fixture: ComponentFixture<DoggiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoggiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoggiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
