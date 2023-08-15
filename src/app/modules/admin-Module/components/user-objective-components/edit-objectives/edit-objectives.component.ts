import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';
import {TuiErrorModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';
import {ButtonComponent} from 'src/app/modules/shared-module/components/button/button.component';
import {CloseIconComponent} from 'src/app/modules/shared-module/components/close-icon/close-icon.component';
import {DicardChangesComponent} from 'src/app/modules/shared-module/components/dicard-changes/dicard-changes.component';
import {InputTextComponent} from 'src/app/modules/shared-module/components/input-text/input-text.component';
import {PlusComponent} from 'src/app/modules/shared-module/components/plus/plus.component';
import {PopupComponent} from 'src/app/modules/shared-module/components/popup/popup.component';
import {objectivesDataDto} from 'src/app/modules/shared-module/models/interfaces';
import {ObjectiveService} from '../../../services/objective.service';

@Component({
  selector: 'app-edit-objectives',
  templateUrl: './edit-objectives.component.html',
  styleUrls: ['./edit-objectives.component.scss'],
  standalone: true,
  imports:[
    ButtonComponent,
    PlusComponent,
    CommonModule,
    DicardChangesComponent,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiInputModule,
    CloseIconComponent,
    InputTextComponent,
    PopupComponent,
  ]
})
export class EditObjectivesComponent implements OnInit {
  @Input() showPopup!: boolean;
  @Input() formInputValue: string;
  @Output() returnData = new EventEmitter();
  @Output() closePopup = new EventEmitter();
  @Input() objectiveName = new FormControl('', [Validators.required]);
  @Input() objectiveId: number;
  @Input() data: objectivesDataDto[];
  editForm: FormGroup;
  primary: string = 'primary';
  button: string = 'button';
  submitBtn: string = 'submit';
  btnName:string = 'update User Objective';
  error = new TuiValidationError('An error');
  enabled = false;
  objectiveTextValue: string = 'Objective Name';
  get computedError(): TuiValidationError | null {
    return this.enabled ? this.error : null;
  }
  constructor(private objService: ObjectiveService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
  }
  handleEmailChange(event) {
    this.editForm.get('objectiveName').setValue(event);
  }
  closeForm() {
    this.closePopup.emit(this.showPopup)
  }

  editObjective(): boolean {
    let updatedObj = {
      id: this.data[this.objectiveId].id,
      name: this.objectiveName.value.toUpperCase(),
    };
    // to check if the edited objective name is already exists before sending the request
    const isNotExisted:boolean = !this.data.some(objective => objective.name.toUpperCase() === this.objectiveName.value.toUpperCase());

    if (this.editForm.valid) {
      if(isNotExisted) {
        this.objService.editObjective(updatedObj).subscribe({
          next: (res) => {
            console.log(res);
            this.showPopup = false;
            this.returnData.emit();
            return true
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
      else{
        // TODO: add toastr to show that the objective name existed
      }
      return isNotExisted;

    } else {
      return false;
    }

  }
  createForm() {
    this.editForm = this.fb.group({
      objectiveName: this.formInputValue
    });
  }
}
