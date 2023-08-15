import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from 'src/app/modules/shared-module/components/button/button.component';
import {PlusComponent} from 'src/app/modules/shared-module/components/plus/plus.component';
import {TableComponent} from 'src/app/modules/shared-module/components/table/table.component';
import {projectsRoleHeaderValues, userRoles} from 'src/app/modules/shared-module/models/enum';
import {
  editProject, IResponse,
  projectsDataDto,
} from 'src/app/modules/shared-module/models/interfaces';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AddUserProjectsComponent} from '../add-user-projects/add-user-projects.component';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss'],
  standalone: true,
  imports: [TableComponent, ButtonComponent, PlusComponent, CommonModule, AddUserProjectsComponent],
})
export class UserProjectsComponent implements OnInit {
  addIcon!: boolean;
  userRoles: string[] = [];
  header;
  secondary: string = 'secondary';
  button: string = 'button';
  btnName: string = 'Add Projects';
  environments!: boolean;
  noDescription!: boolean;
  data: projectsDataDto[];
  editedProject: editProject;
  showAddPopup!: boolean;
  objectiveName = new FormControl('', [Validators.required]); // to pass it to the edit component form input
  editPopupFlag:boolean;
  constructor(private projService: ProjectService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userRoles = userRoles;
    this.header = {...projectsRoleHeaderValues};
    this.addIcon = true;
    this.noDescription = false;
    this.environments = true;
    this.noDescription = false;
    this.getAllProjects();
  }
  closAddForm() {
    this.showAddPopup = false;
  }


  openAddPopup(event) {
    this.editedProject = null;
    this.showAddPopup = true;
  }

  getAllProjects() {
    return this.projService.getAllProjects().subscribe({
      next: (res: IResponse) => {
        this.data = res.value.items
        return this.data
      }
    })
  }

  editProject(event): void {
    this.projService.getProject(this.data[event].id).subscribe(({
      next: (res) => {
        this.editedProject = res['value'];
        this.showAddPopup = true
        this.editPopupFlag = true
        this.editedProject.id = this.data[event].id
      }
    }))

  }
}
