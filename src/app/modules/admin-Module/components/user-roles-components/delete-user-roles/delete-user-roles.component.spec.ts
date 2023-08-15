import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteUserRolesComponent} from './delete-user-roles.component';

describe('DeleteUserRolesComponent', () => {
  let component: DeleteUserRolesComponent;
  let fixture: ComponentFixture<DeleteUserRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserRolesComponent]
    });
    fixture = TestBed.createComponent(DeleteUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
