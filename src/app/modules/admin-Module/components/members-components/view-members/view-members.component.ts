import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from 'src/app/modules/shared-module/components/button/button.component';
import {PlusComponent} from 'src/app/modules/shared-module/components/plus/plus.component';
import {TableComponent} from 'src/app/modules/shared-module/components/table/table.component';
import {membersDataDtos, membersHeaderValues, userRoles} from 'src/app/modules/shared-module/models/enum';
import {IResponse, membersDataDto} from 'src/app/modules/shared-module/models/interfaces';
import {AddMembersComponent} from "../add-members/add-members.component";
import {PopupComponent} from "../../../../shared-module/components/popup/popup.component";
import {UseRolesService} from "../../../services/useRoles.service";

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.scss'],
  standalone: true,
  imports: [TableComponent, ButtonComponent, PlusComponent, CommonModule, AddMembersComponent, PopupComponent],
})
export class ViewMembersComponent implements OnInit {
  addIcon!: boolean;
  environments!:boolean;
  noDescription!: boolean;
  approval!: boolean;
  role!: boolean;
  isEmail!:boolean;
  data: membersDataDto[];
  userRoles: string[] = [];
  header;
  secondary: string = 'secondary';
  button: string = 'button';
  btnName: string = 'Add Member';
  showPopup:boolean = false
  rolesArray:string[] = []
  constructor(private roleService:UseRolesService) {
  }
  ngOnInit(): void {
    this.userRoles = userRoles;
    this.data = membersDataDtos;
    this.header = { ...membersHeaderValues };
    this.addIcon = true;
    this.noDescription = false;
    this.approval = true;
    this.role = true;
    this.isEmail = true;
    this.environments = false;
    console.log('members');
    this.getAllRoles();

  }
  showAddMember(){
    this.showPopup = true;
  }
  getAllRoles() {
    this.roleService.getRoles().subscribe({
      next: (res: IResponse) => {
        res.value.items.map(item => {
            this.rolesArray.push(item.name)
          }
        )
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
}
