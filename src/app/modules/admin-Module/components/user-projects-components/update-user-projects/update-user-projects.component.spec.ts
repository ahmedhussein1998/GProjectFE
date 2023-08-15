import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateUserProjectsComponent} from './update-user-projects.component';

describe('UpdateUserProjectsComponent', () => {
  let component: UpdateUserProjectsComponent;
  let fixture: ComponentFixture<UpdateUserProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserProjectsComponent]
    });
    fixture = TestBed.createComponent(UpdateUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
