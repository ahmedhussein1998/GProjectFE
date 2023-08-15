import {NgModule} from '@angular/core';
import {
  CreateUserRolesComponent
} from './components/user-roles-components/create-user-roles/create-user-roles.component';
import {EditUserRolesComponent} from './components/user-roles-components/edit-user-roles/edit-user-roles.component';
import {
  DeleteUserRolesComponent
} from './components/user-roles-components/delete-user-roles/delete-user-roles.component';
import {
  UpdateUserProjectsComponent
} from './components/user-projects-components/update-user-projects/update-user-projects.component';
import {
  DeleteUserProjectsComponent
} from './components/user-projects-components/delete-user-projects/delete-user-projects.component';
import {EditMembersComponent} from './components/members-components/edit-members/edit-members.component';
import {DeleteMembersComponent} from './components/members-components/delete-members/delete-members.component';
import {AdminRoutingModule} from './admin-module-routing.module';
import {AdminComponent} from './components/admin/admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from "../shared-module/components/button/button.component";
import {CloseIconComponent} from "../shared-module/components/close-icon/close-icon.component";
import {DicardChangesComponent} from "../shared-module/components/dicard-changes/dicard-changes.component";
import {InputTextComponent} from "../shared-module/components/input-text/input-text.component";
import {NgForOf, NgIf} from "@angular/common";
import {PlusComponent} from "../shared-module/components/plus/plus.component";
import {PopupComponent} from "../shared-module/components/popup/popup.component";
import {TuiSvgModule} from "@taiga-ui/core";

@NgModule({
  declarations: [
    CreateUserRolesComponent,
    EditUserRolesComponent,
    DeleteUserRolesComponent,
    UpdateUserProjectsComponent,
    DeleteUserProjectsComponent,
    EditMembersComponent,
    DeleteMembersComponent,
    AdminComponent,
  ],
    imports: [
        AdminRoutingModule,
        ReactiveFormsModule,
        ButtonComponent,
        CloseIconComponent,
        DicardChangesComponent,
        InputTextComponent,
        NgForOf,
        NgIf,
        PlusComponent,
        PopupComponent,
        TuiSvgModule,
    ],
})
export class AdminModuleModule {}
