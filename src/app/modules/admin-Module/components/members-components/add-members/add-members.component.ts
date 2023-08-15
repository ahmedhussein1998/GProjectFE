import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextComponent} from "../../../../shared-module/components/input-text/input-text.component";
import {InputSelectComponent} from "../../../../shared-module/components/input-select/input-select.component";
import {ButtonComponent} from "../../../../shared-module/components/button/button.component";
import {CloseIconComponent} from "../../../../shared-module/components/close-icon/close-icon.component";
import {PopupComponent} from "../../../../shared-module/components/popup/popup.component";
import {UseRolesService} from "../../../services/useRoles.service";
import {TuiStringHandler } from "@taiga-ui/cdk";
import {RegexPattern} from "../../../../shared-module/Constnats/app-constants";



@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, InputTextComponent,InputSelectComponent, ButtonComponent, CloseIconComponent, PopupComponent]
})
export class AddMembersComponent implements OnInit {
  secondary: string = 'secondary';
  primary: string = 'primary';
  button: string = 'button';
  submitBtn: string = 'submit';
  btnName: string = 'Add Member';
  editBtnName: string = 'Edit Project';
  addEnv: string = 'Add Environment';
  editEnv: string = 'Edit Environment';
  cancel: string = 'Cancel';
  addMemberForm: FormGroup;
  fullNameText: string = "Full Name";
  emailText: string = "User Email";
  rolesText: string = "User Roles";
  fullName: FormControl = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)]));
  email: FormControl = new FormControl('', Validators.compose([Validators.required, Validators.pattern(RegexPattern.Email), Validators.maxLength(50)]));
  rolesControl: FormControl = new FormControl(['Requester'], [Validators.required]);
  @Input() rolesSelectedArray: string[] = []



  closeForm() {
  }

  constructor(private fb: FormBuilder, private roleService: UseRolesService) {
  }

  ngOnInit() {
    this.createForm();
    // this.getAllRoles();
    // console.log(this.rolesSelectedArray)
    // console.log(Array.isArray(this.rolesSelectedArray))
  }

  createForm() {
    this.addMemberForm = this.fb.group({
      fullName: this.fullName,
      email: this.email,
      roles: this.rolesControl,
    })
  }
  addMember() {

    let memberInfro={
      fullName:this.addMemberForm.get('fullName').value,
      email:this.addMemberForm.get('email').value,
      roles:this.addMemberForm.get('roles').value
    }
    console.log(memberInfro)
    this.roleService.createMember(memberInfro).subscribe({
      next: (res)=>{
        console.log(res);
      },
      error:err=>{
        console.log(err)
      }
    })
  }
}
