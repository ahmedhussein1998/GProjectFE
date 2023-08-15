import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';
import {TuiErrorModule} from '@taiga-ui/core';
import {
  TUI_PASSWORD_TEXTS,
  TuiInputModule,
  TuiInputPasswordModule,
  tuiInputPasswordOptionsProvider
} from '@taiga-ui/kit';
import {GetValidationMessage, ValidationMessageParameters} from "../../Constnats/app-constants";
import {of} from 'rxjs';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    tuiInputPasswordOptionsProvider({
      icons: {
        hide: 'tuiIconLockLarge',
        show: 'tuiIconUnlockLarge',
      },
    }),
    {
      provide: TUI_PASSWORD_TEXTS,
      useValue: of(['']),
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [TuiInputModule, TuiErrorModule, ReactiveFormsModule, CommonModule, TuiInputPasswordModule]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() name: string;
  @Input() inputErrorCondition!: boolean;
  @Input() inputErrorMessage: TuiValidationError |string | null;
  @Input() value: string;
  @Input() type:'clear'|'password' = 'clear';
  @Input() inputCustomError: boolean;
  @Input() customErrorMessage:TuiValidationError |string | null;
  onChange: (value: string) => void;
  onTouched: () => void;

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  @Output() inputChanged = new EventEmitter<string>();
  @Input() inputControl: FormControl = new FormControl();
  onInputChange(value: string): void {
    this.inputChanged.emit(value);
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
}
