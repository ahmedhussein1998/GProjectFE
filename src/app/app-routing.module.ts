import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticateGuard} from './modules/shared-module/Guards/authenticate.guard';
import {Admin, Chat, Login,} from './modules/shared-module/Constnats/app-routes-constants';
import {isLoggedGuard} from './modules/shared-module/Guards/is-logged.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: Login,
    loadChildren: () =>
      import('./modules/authenticate/authenticate.module').then(
        (m) => m.AuthenticateModule
      ),
  },
  {
    path: Admin,
    canActivate: [authenticateGuard],
    loadChildren: () =>
      import('./modules/admin-Module/admin-module.module').then(
        (m) => m.AdminModuleModule
      ),
  },{
    path: Chat,
    canActivate: [authenticateGuard],
    loadChildren: () => import('./modules/chat-Module/chat-module.module').then(
      (m) => m.ChatModuleModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
