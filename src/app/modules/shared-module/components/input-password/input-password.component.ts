import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {TUI_PASSWORD_TEXTS, TuiInputPasswordModule, tuiInputPasswordOptionsProvider,} from '@taiga-ui/kit';
import {of} from 'rxjs';
import {TuiValidationError} from '@taiga-ui/cdk';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TuiErrorModule} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';
import {GetValidationMessage, ValidationMessageParameters} from "../../Constnats/app-constants";

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
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
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    }
  ],
  standalone: true,
  imports:[TuiInputPasswordModule , TuiErrorModule , ReactiveFormsModule , CommonModule]
})
export class InputPasswordComponent implements ControlValueAccessor {
  @Input() name: string;
  @Input() errorCondition: boolean;
  @Input() errorMessage: TuiValidationError | string | null;
  @Input() passwordControl: FormControl = new FormControl();
  @Output() passwordChanged = new EventEmitter<string>();
  password: string;
  @Input() value: string;
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

  onInputChange(value: any): void {
    this.password = value;
    this.passwordChanged.emit(value);
  }
  get errorList(): string[]{
    let messages: string[] = [];
    const params: ValidationMessageParameters = {
      controlName: this.name
    };
    for (const key of Object.keys(this.passwordControl.errors)) {
      // console.log(key);
      messages.push(GetValidationMessage(key,params));

    }
    return  messages;
  }
}

