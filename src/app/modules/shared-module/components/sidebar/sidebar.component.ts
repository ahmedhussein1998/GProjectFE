import {Component, Input} from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent{
@Input() links = [];
@Input() activeRoute: string ='';
value:number;
currentUrl:string
constructor(private router: Router, private auth:AuthService){}

// to update the progressive bar value
updateBars(){
  this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
        switch (this.currentUrl.split('/').pop()) {
          case 'userroles':
            this.value = 1;
            break;
          case 'userprojects':
            this.value = 2;
            break;
          case 'userobjectives':
            this.value = 3;
            break;
          case 'members':
            this.value = 4;
            break;
        }
        this.auth.updateBar(this.value);
      });
}
}
