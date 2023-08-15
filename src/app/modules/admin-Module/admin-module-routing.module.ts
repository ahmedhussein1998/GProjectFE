import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Members, User_Objectives, User_Projects, User_Roles} from "../shared-module/Constnats/app-routes-constants";
import {AdminComponent} from "./components/admin/admin.component";
import {authenticateGuard} from "../shared-module/Guards/authenticate.guard";

const routes:Routes=[
    {path: '' , component:AdminComponent},
    {path: User_Roles , canActivate:[authenticateGuard], loadComponent:()=> import('./components/user-roles-components/user-roles/user-roles.component').then(c=>c.UserRolesComponent)},
    {path: User_Objectives , canActivate:[authenticateGuard],  loadComponent:()=> import('./components/user-objective-components/view-objectives/view-objectives.component').then(c=>c.ViewObjectivesComponent)},
    {path: User_Projects , canActivate:[authenticateGuard], loadComponent:()=> import('./components/user-projects-components/user-projects/user-projects.component').then(c=>c.UserProjectsComponent)},
    {path: Members , canActivate:[authenticateGuard],  loadComponent:()=> import('./components/members-components/view-members/view-members.component').then(c=>c.ViewMembersComponent)},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule {}
