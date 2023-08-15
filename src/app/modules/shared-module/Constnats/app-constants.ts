import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {linksDto} from '../models/interfaces';

export const RegexPattern = {
  Email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
  // password: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
};

export function whitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (typeof value === 'string' && value.trim().length === 0) {
      return {whitespace: true};
    }
    return null;
  };
}

export function checkNameUniqueness(data: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return data.some(value => value.toUpperCase() == control.value.toUpperCase())
      ? {nameExisted: true}
      : null;
  };
}
export const linksEnumDto: linksDto[] = [
  {
    linkName: 'admin/userprojects',
    linkIconSrc: 'tuiIconLayersLarge',
    elementContent: 'Projects',
  },
  {
    linkName: 'admin/userobjectives',
    linkIconSrc: 'tuiIconBarChart2Large',
    elementContent: 'Objectives',
  },
  {
    linkName: 'admin/members',
    linkIconSrc: 'tuiIconUsersLarge',
    elementContent: 'Members',
  },
];

export interface ValidationMessageParameters {
  controlName: string;
}

export function GetValidationMessage(
  key: string,
  params: ValidationMessageParameters
): string {
  if (!(key in ValidationMessages)) return ValidationMessages.unknown;

  let msg = ValidationMessages[key];
  for (const key of Object.keys(params)) {
    msg = msg.replace(`{${key}}`, params[key]);
  }
  return msg;
}

export const ValidationMessages: { [k: string]: string } = {
  unknown: 'Invalid Error',
  required: '{controlName} field is required',
  minlength: 'You should enter at least three characters Not spaces',
  whitespace: '{controlName} field is required Not spaces',
  nameExisted: '{controlName} field name already exists',
  pattern:'{controlName} field value is not true'
};
