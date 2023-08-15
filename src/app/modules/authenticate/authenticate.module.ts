import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticateRoutingModule} from './authenticate-routing.module';
import {TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';
import {SharedModuleModule} from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthenticateRoutingModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiErrorModule,
    SharedModuleModule
  ]
})
export class AuthenticateModule { }
