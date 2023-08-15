import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {
  TuiDataListModule, TuiDropdownModule,
  TuiErrorModule,
  TuiHintModule,
  TuiRootModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {TuiMultiSelectModule} from '@taiga-ui/kit';
import {GetValidationMessage, ValidationMessageParameters} from "../../Constnats/app-constants";
import {TuiBooleanHandler} from "@taiga-ui/cdk";
interface Item {
  name: string;
  readonly id: number;
}

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TuiDataListModule, TuiMultiSelectModule, ReactiveFormsModule, CommonModule, TuiTextfieldControllerModule, TuiHintModule, TuiRootModule, TuiErrorModule, TuiDropdownModule],
})
export class InputSelectComponent implements  OnInit{
  search: string | null = '';
  @Input() newItems: string[] | null = [];
  @Input() inputControl:FormControl = new FormControl();
  @Input() name:string;
  Requester:string = 'Requester'
  ngOnInit() {
    this.newItems.sort((a, b) => {
      if (a.startsWith("Requester") && !b.startsWith("Requester")) {
        return -1; // a comes before b
      } else if (!a.startsWith("Requester") && b.startsWith("Requester")) {
        return 1; // b comes before a
      } else {
        return a.localeCompare(b); // sort alphabetically
      }
    });
  }

  get errorList(): string[]{
    let messages: string[] = [];
    const params: ValidationMessageParameters = {
      controlName: this.name
    };
    for (const key of Object.keys(this.inputControl.errors)) {
      // console.log(key);
      messages.push(GetValidationMessage(key,params));

    }
    return  messages;
  }
  disableHandler: TuiBooleanHandler<string> = (item) =>
    item.startsWith('Requester');

}
