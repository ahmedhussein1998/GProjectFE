import {Component, OnInit} from '@angular/core';
import {AuthService} from './modules/shared-module/Services/auth.service';
import {linksEnumDto} from 'src/app/modules/shared-module/Constnats/app-constants';
import {linksDto} from 'src/app/modules/shared-module/models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Script-Management-Tool';
  links: linksDto[] = linksEnumDto;
  activeRoute: string = 'admin/userroles';
  activeElementContent: string = 'User Roles';
  isAuthenticated!: boolean;
  showLoader!: boolean;
  loadApp!: boolean;
  routeValue: number = 1;
  routerName: string;

  // showSideBar = showSideBar;
  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    // to show the side bar to the whole app
    if (this.auth.getToken()) {
      this.auth.updateData(true);
    }
    this.auth.isLoggedSubject$.subscribe((data) => {
      console.log(data)
      this.isAuthenticated = data;

    });
    // ///////////////////////////////

    this.loadApp = false;
    this.auth.showLoader(true);
    this.auth.showLoaderSubject$.subscribe((data) => {
      this.showLoader = data;
    });

    setTimeout(() => {
      this.loadApp = true;
      this.auth.showLoader(false); // Hide the loader after content is loaded
    }, 3000);
    // update the progressive bar value
    this.auth.progressSubject$.subscribe((path) => {
      if (path == 1) {
        this.routerName = "User Roles"
      }
      if (path == 2) {
        this.routerName = "Projects"
      }
      if (path == 3) {
        this.routerName = "Objectives"
      }
      if (path == 4) {
        this.routerName = "Members"
      }
      this.routeValue = path
    });
  }

}
