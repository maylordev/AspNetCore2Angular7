import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavMenuComponent } from './top-nav-menu.component';

describe('TopNavMenuComponent', () => {
  let component: TopNavMenuComponent;
  let fixture: ComponentFixture<TopNavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
