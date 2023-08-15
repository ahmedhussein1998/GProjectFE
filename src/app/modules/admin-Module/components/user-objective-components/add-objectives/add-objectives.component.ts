import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
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
import {objectiveName} from '../../../models/interfaces';

@Component({
  selector: 'app-add-objectives',
  templateUrl: './add-objectives.component.html',
  styleUrls: ['./add-objectives.component.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class AddObjectivesComponent implements OnInit {
  @Input() showPopup!: boolean;
  @Input() objectiveId: number;
  @Input() data: objectivesDataDto[];
  @Output() closePopup = new EventEmitter();
  @Output() returnData = new EventEmitter();  // to rerender the data again from getObjectives again after add the
  objectiveName = new FormControl('', [Validators.required]);
  addForm: FormGroup;
  primary: string = 'primary';
  button: string = 'button';
  submitBtn: string = 'submit';
  btnName: string = 'Add User Objective';
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
    this.addForm.get('objectiveName').setValue(event);
  }
  closeForm() {
    this.objectiveName.reset();
    this.addForm.updateValueAndValidity();
    this.closePopup.emit(this.showPopup);
  }

  addObjective() {
    if (this.addForm.valid) {
      let objectiveData: objectiveName = {
        name: this.addForm.get('objectiveName').value,
      };
      const isNotExisted: boolean = !this.data.some(
        (objective) =>
          objective.name.toUpperCase() ===
          this.objectiveName.value.toUpperCase()
      );
      if (isNotExisted) {
        this.objService.createObjective(objectiveData).subscribe({
          next: (res) => {
            console.log(res);
            this.returnData.emit();
            this.closeForm();

          },
          error: (err) => {
            console.log(err);
          },
        });
      }
      else{
        // TODO: add toastr to show that the objective name existed
      }
    }
  }
  createForm() {
    this.addForm = this.fb.group({
      objectiveName: this.objectiveName.value,
    });
  }
}
