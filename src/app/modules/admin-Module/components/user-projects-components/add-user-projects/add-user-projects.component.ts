import {CommonModule} from '@angular/common';
import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ButtonComponent} from 'src/app/modules/shared-module/components/button/button.component';
import {CloseIconComponent} from 'src/app/modules/shared-module/components/close-icon/close-icon.component';
import {DicardChangesComponent} from 'src/app/modules/shared-module/components/dicard-changes/dicard-changes.component';
import {InputPasswordComponent} from 'src/app/modules/shared-module/components/input-password/input-password.component';
import {InputTextComponent} from 'src/app/modules/shared-module/components/input-text/input-text.component';
import {PlusComponent} from 'src/app/modules/shared-module/components/plus/plus.component';
import {PopupComponent} from 'src/app/modules/shared-module/components/popup/popup.component';
import {editProject, environments, singleProjectDataDto} from 'src/app/modules/shared-module/models/interfaces';
import {ProjectService} from '../../../services/project.service';
import {AddProjectModel, FormControlWrapper, InitProjectModel,} from '../../../models/interfaces';
import {checkNameUniqueness, whitespaceValidator} from "../../../../shared-module/Constnats/app-constants";
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
  selector: 'app-add-user-projects',
  templateUrl: './add-user-projects.component.html',
  styleUrls: ['./add-user-projects.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    PlusComponent,
    CommonModule,
    DicardChangesComponent,
    ReactiveFormsModule,
    CloseIconComponent,
    PopupComponent,
    InputTextComponent,
    InputPasswordComponent,
    TuiSvgModule,
  ],
})
export class AddUserProjectsComponent implements OnInit,AfterContentInit {
  @Input() showEnvPopup!: boolean;
  @Input() objectiveId: number;
  @Input() projectData?: editProject;
  @Output() closePopup = new EventEmitter();
  @Input() editFlag: boolean = false;
  @Output() returnData = new EventEmitter(); // to rerender the data again from getObjectives again after add the
  handlers = {
    projectName: 'Project Name',
    name: 'Environment Name',
    hostName: 'Host',
    dbServerName: 'DB Server',
    ddl: 'DDL',
    dml: 'DML',
    userName: 'User Name',
    password: 'Password',
  };
  secondary: string = 'secondary';
  primary: string = 'primary';
  button: string = 'button';
  submitBtn: string = 'submit';
  btnName: string = 'Add Project';
  editBtnName: string = 'Edit Project';
  addEnv: string = 'Add Environment';
  editEnv: string = 'Edit Environment';
  cancel: string = 'Cancel';
  showDiscardPopup: boolean = false;
  currentEnvironmentIndex = 0;
  addProject: FormGroup<FormControlWrapper<InitProjectModel>>;

  constructor(private fb: FormBuilder, private projService: ProjectService) {
  }

  ngOnInit() {
    this.addProject = this.creatProjectForm();
  }

  ngAfterContentInit(): void {
    if (! this.projectData) return;
    this.addProject.controls.projectName.setValue(this.projectData.name);
    if (this.projectData.environments.length == 0) return;
    for (const env of this.projectData.environments) {
      const envForm = this.createEnvironmentForm();
      Object.keys(env).forEach(k =>  envForm.controls[k]?.setValue(env[k]));
      this.addProject.controls.environments.controls.push(envForm)
    }
  }

  closeForm() {
    this.closePopup.emit(false);
  }
  closeEnvForm(envIndex: number) {
    console.log(this.currentEnvironments.controls[this.currentEnvironmentIndex].touched)
    if(this.currentEnvironments.controls[this.currentEnvironmentIndex].touched){
      this.showDiscardPopup = true;
      if (this.currentEnvironments.controls[envIndex].valid) {
        this.showEnvPopup = false;
      } else {
        console.log('inValid');
      }
    }
   else{
      if(this.currentEnvironments.controls[this.currentEnvironmentIndex].invalid){
        this.currentEnvironments.removeAt(this.currentEnvironmentIndex)
      }
      this.showEnvPopup = false;
    }
  }
  showEditPopup(envNameIndex){
    this.currentEnvironmentIndex = envNameIndex;
    this.showEnvPopup = true;
  }

  discardChanges() {
    this.showDiscardPopup = false;
    this.showEnvPopup = false;
    if(this.currentEnvironments.controls[this.currentEnvironmentIndex].invalid){
      this.currentEnvironments.removeAt(this.currentEnvironmentIndex)
    }
  }

  cancelDiscard() {
    this.showDiscardPopup = false;
    this.showEnvPopup = true;
  }

  creatProjectForm(): FormGroup<FormControlWrapper<InitProjectModel>>{
    return this.fb.group<FormControlWrapper<InitProjectModel>>({
      projectName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        whitespaceValidator()
      ])),
      environments: this.fb.array(
        [] as FormGroup<FormControlWrapper<AddProjectModel>>[]
      ),
    });
  }

  createEnvironmentForm():FormGroup<FormControlWrapper<AddProjectModel>>{
    return this.fb.group<FormControlWrapper<AddProjectModel>>({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        whitespaceValidator(),
        checkNameUniqueness(this.addProject.controls.environments.controls.map(x => x.controls.name.value))
      ])),
      hostName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        whitespaceValidator()
      ])),
      dbServerName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        whitespaceValidator()
      ])),
      ddl: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        whitespaceValidator()
      ])),
      dml: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        whitespaceValidator()
      ])),
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        whitespaceValidator()
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        whitespaceValidator()
      ])),
    });
  }


  get currentEnvironments(): FormArray<FormGroup<FormControlWrapper<AddProjectModel>>> {
    return this.addProject.controls.environments;
  }


  getEnvironmentControls(index: number): string[] {
    return Object.keys(
      this.addProject.controls.environments.controls.at(index).controls
    );
  }

  addEnvironment() {
    const environmentsArray = this.currentEnvironments;
    environmentsArray?.push(this.createEnvironmentForm());
    this.currentEnvironmentIndex = environmentsArray.length -1;
    this.showEnvPopup = true;
  }

  addEnvironmentToForm(envIndex: number) {
    const environmentFormGroup = this.currentEnvironments.controls[envIndex];
    if (environmentFormGroup.valid) {
      this.showEnvPopup = false;
      return true;
    } else {
      return false;
    }
  }

  addProjectFn() {
    let formDataObject = {
      name: this.addProject.controls.projectName.value,
      isActive: true,
      isDeleted: false,
      environments: this.currentEnvironments.value,
    };
    if (this.addProject.valid) {
      this.projService.addProject(formDataObject).subscribe({
        next: (res) => {
          this.closeForm();
          this.returnData.emit();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

  }
  editProject(){
    console.log(this.projectData)
    let allEnv:environments[] = [];
    let controlsArray = this.currentEnvironments.controls
    controlsArray.map(control=>{
      let envObj:environments={
        name: '',
        hostName: '',
        ddl: '',
        dml: '',
        dbServerName: '',
        userName: '',
        password: ''
      };
      envObj.name = control.controls.name.value;
      envObj.hostName = control.controls.hostName.value;
      envObj.ddl = control.controls.ddl.value;
      envObj.dml = control.controls.dml.value;
      envObj.dbServerName = control.controls.dbServerName.value;
      envObj.userName = control.controls.userName.value;
      envObj.password = control.controls.password.value;
      allEnv.push(envObj)
    })
    let projectData:editProject = {
      id:this.projectData.id,
      name: this.addProject.controls.projectName.value,
      isActive: true,
      isDeleted: true,
      environments: allEnv
    }
    console.log(projectData)
    this.projService.editProject(projectData).subscribe({
      next: (res) => {
        this.closeForm();
        this.returnData.emit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
