import {FormControl, FormGroup} from '@angular/forms';
import {tableRoleHeaderValues} from './../../../../shared-module/models/enum';
import {Component, OnInit} from '@angular/core';
import {linksEnumDto} from 'src/app/modules/shared-module/Constnats/app-constants';
import {tableData, userRoles} from 'src/app/modules/shared-module/models/enum';
import {linksDto, tableDataDto} from 'src/app/modules/shared-module/models/interfaces';
import {TableComponent} from 'src/app/modules/shared-module/components/table/table.component';
import {ButtonComponent} from 'src/app/modules/shared-module/components/button/button.component';
import {PlusComponent} from 'src/app/modules/shared-module/components/plus/plus.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss'],
  standalone: true,
  imports: [TableComponent , ButtonComponent , PlusComponent , CommonModule ],
})
export class UserRolesComponent implements OnInit {
  links:linksDto[] = linksEnumDto
  secondary:string = 'secondary';
  button:string = 'button';
  btnName:string = 'Add User Roles';
  addIcon!:boolean;
  noDescription!: boolean;
  userRoles:string [] =[];
  data:tableDataDto[];
  header
  testForm = new FormGroup({

    testValue: new FormControl(),
    testValue4: new FormControl(),
  });
;  constructor() {
  }
  ngOnInit(): void {
    this.userRoles = userRoles
    this.data = tableData
    this.header = {...tableRoleHeaderValues}
    this.addIcon = false;
    this.noDescription= true;
    console.log('userRoles');

  }
  changeBarValue($event){}
}

