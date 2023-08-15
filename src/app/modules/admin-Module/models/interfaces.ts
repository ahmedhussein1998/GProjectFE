import {FormArray, FormControl, FormGroup} from '@angular/forms';


export interface objectiveName {
  name: string;
}

export interface AddProjectModel {
  name: string;
  hostName: string;
  dbServerName: string;
  ddl: string;
  dml: string;
  userName: string;
  password: string;
}

export interface InitProjectModel {
  projectName?: string;
  environments: FormArray<FormGroup<FormControlWrapper<AddProjectModel>>>;
}

export type FormControlWrapper<T> = {
  [P in keyof T]: T[P] extends FormArray ? T[P] : FormControl<T[P]>;
};
export interface RolesDto{
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: string;
}
