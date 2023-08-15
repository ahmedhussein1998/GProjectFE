import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators,} from '@angular/forms';
import {ButtonComponent} from 'src/app/modules/shared-module/components/button/button.component';
import {PlusComponent} from 'src/app/modules/shared-module/components/plus/plus.component';
import {TableComponent} from 'src/app/modules/shared-module/components/table/table.component';
import {objectiveRoleHeaderValues, userRoles,} from 'src/app/modules/shared-module/models/enum';
import {IResponse, objectivesDataDto} from 'src/app/modules/shared-module/models/interfaces';
import {ObjectiveService} from '../../../services/objective.service';
import {EditObjectivesComponent} from '../edit-objectives/edit-objectives.component';
import {AddObjectivesComponent} from '../add-objectives/add-objectives.component';

@Component({
  selector: 'app-view-objectives',
  templateUrl: './view-objectives.component.html',
  styleUrls: ['./view-objectives.component.scss'],
  standalone: true,
  imports: [
    TableComponent,
    ButtonComponent,
    PlusComponent,
    CommonModule,
    EditObjectivesComponent,
    AddObjectivesComponent,
  ],
})
export class ViewObjectivesComponent implements OnInit {
  objectiveId: number;
  addIcon!: boolean;
  noDescription!: boolean;
  data: objectivesDataDto[];
  userRoles: string[] = [];
  header;
  secondary: string = 'secondary';
  button: string = 'button';
  btnName: string = 'Add User Objective';
  showPopup!: boolean;
  showAddPopup!: boolean;
  objectiveName = new FormControl('', [Validators.required]); // to pass it to the edit component form input
  formInputValue: string; // to pass it to the edit component form input value
  constructor(private objService: ObjectiveService) {}
  ngOnInit(): void {
    this.userRoles = userRoles;
    this.header = { ...objectiveRoleHeaderValues };
    this.addIcon = true;
    this.noDescription = false;

    this.getAllObjectives();
  }
  showForm() {
    this.showAddPopup = true;
  }

  closeEditForm() {
    this.showPopup = false;
  }
  closeAddPopup() {
    this.showAddPopup = false;
  }

  getAllObjectives() {
    this.objService.getObjectives().subscribe({
      next: (res:IResponse) => {
        this.data = res.value.items
      },
    });
  }
  openEditPopup(event) {
    this.showPopup = true;
    this.formInputValue = this.data[event].name;
    this.objectiveName.setValue(this.formInputValue);
    this.objectiveId = event;
  }
}
