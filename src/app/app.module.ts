import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModuleModule} from './modules/shared-module/shared-module.module';
import {HttpClientModule} from "@angular/common/http";
import {TuiRootModule} from '@taiga-ui/core';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {httpInterceptorProviders} from './modules/shared-module/Interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TuiRootModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    RouterModule,
  ],
  bootstrap: [AppComponent],
  providers: httpInterceptorProviders
})
export class AppModule {}
