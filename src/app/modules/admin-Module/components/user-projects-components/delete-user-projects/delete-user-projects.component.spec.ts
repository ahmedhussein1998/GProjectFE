import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteUserProjectsComponent} from './delete-user-projects.component';

describe('DeleteUserProjectsComponent', () => {
  let component: DeleteUserProjectsComponent;
  let fixture: ComponentFixture<DeleteUserProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserProjectsComponent]
    });
    fixture = TestBed.createComponent(DeleteUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
