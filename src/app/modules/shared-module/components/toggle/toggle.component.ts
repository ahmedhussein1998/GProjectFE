import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiToggleModule} from '@taiga-ui/kit';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[TuiToggleModule , ReactiveFormsModule]
})
export class ToggleComponent implements OnInit {
  @ViewChild('toggle') toggleElement;
 @Input() formControlValue;
 @Output() valueChanged = new EventEmitter<boolean>()
 activeForm:FormGroup
 ngOnInit(): void {
   this.activeForm = new FormGroup({
    isActive: new FormControl(this.formControlValue)
   })

 }
 submitValue(){
  this.valueChanged.emit(this.toggleElement.value)
 }

}
